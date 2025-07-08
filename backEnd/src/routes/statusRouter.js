import { Router } from "express";

export const statusRouter = Router()

statusRouter.get(
    "/v01/status" , (req,res) => {
        res.json(
            {
                status:200,
                timeStatus: new Date().toISOString(),
                message: "Welcome"
            }
        )
    }
)

statusRouter.get(
    "/v02/status" , (req,res) => {
        res.json(
            {
                status:200,
                timeStatus: new Date().toISOString(),
                message: "Finish"
            }
        )
    }
)