import { request } from "express";

const logger = (req, res, next) => {
    const url = req.url;
    const host = req.hostname;
    const method = req.method;
    const requestedAt = new Date().toLocaleString();
    const result = `${method} --> ${host} --> ${url} --> ${requestedAt}`;
    console.log(result);
    next()
};
export {logger}