import { http, HttpResponse } from 'msw'

const mockSingleResponse = { "Rows Added": 1 };
const mockMultipleResponse = { "Rows Added": 2 };

export const handlers = [
  http.post("http://localhost:8080/expense/add", () => {
    return HttpResponse.json(mockSingleResponse);
  }),
  http.post("http://localhost:8080/expense/bulkadd", () => {
    return HttpResponse.json(mockMultipleResponse);
  }),
];