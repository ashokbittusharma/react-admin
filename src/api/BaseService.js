import api from "./axios";

export default class BaseService {
    constructor(resource) {
        this.resource = resource;
    }

    async list(params = {}) {
        const response = await api.get(this.resource, {
            params,
        })
        return {
            rows: response.data.member,
            total: response.data.totalItems,
        }
    }

    async get(id) {
        const response = await api.get(`${this.resource}/${id}`);
        return response.data;
    }

    async create(data) {
        const response = await api.post(this.resource, data, {
            headers: {
                "Content-Type": "application/ld+json",
            },
        });
        return response.data;
    }

    async update(id, data) {
        const response = await api.patch(
            `${this.resource}/${id}`,
            data,
            {
                headers: {
                    "Content-Type": "application/merge-patch+json"
                }
            }
        );
        return response.data;
    }

    async delete(id) {
        return api.delete(`${this.resource}/${id}`);
    }
}
