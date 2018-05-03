import request from '../utils/request';
import stringify from './stringify';
import ORDERS from '../services/order';
const SERVICES = {
  ORDERS,
};

export async function fetch(payload) {
  const service = SERVICES[payload.name][payload.action];

  console.log(service.method === 'GET')
  if(service.method === 'GET' || service.method === 'DELETE') {
    return request(`${service.url}?${stringify(payload.params)}`, {
      method: service.method,
      headers: service.headers || {},
    });
  } else {
    return request(service.url, {
      method: service.method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ ...service.params }),
    });
  }
  
}

export default function createServices(services) {
  const newServices = {};
  
  Object.entries(services).map(([key, service])=> {
    if(typeof service === 'object') {
      if(service.method === 'GET' || service.method === 'DELETE') {
        newServices[key] = async (params)=> {
          return request(`${service.url}?${stringify(params)}`, {
            method: service.method,
            headers: service.headers || {},
          });
        }
      } else {
        const headers = service.headers ? ({
            'Content-Type': 'application/json;charset=utf-8',
            ...service.headers,
          }) : ({
            'Content-Type': 'application/json;charset=utf-8',
          });

        newServices[key] = async (params)=> {
          return request(service.url, {
            method: service.method,
            headers,
            body: JSON.stringify({ ...service.params }),
          });
        };
      }
    } else {
      newServices[key] = service;
    }
  });

  return newServices;
}