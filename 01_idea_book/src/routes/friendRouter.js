import { Router } from "express";
import { Schema } from "mongoose";

const friendRoute = Router()

friendRoute.route("/findfriends").get()