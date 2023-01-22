import { RequestHandler } from "express";

export const getNotFound: RequestHandler = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "404", path: "" });
};
