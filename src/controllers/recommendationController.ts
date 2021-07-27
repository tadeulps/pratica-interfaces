import { Request, Response } from "express";
import * as recommendationService from "../services/recommendationService";

interface GetRecommendation{
  name:string;
  youtubeLink:string;
}
export async function postRecommendation(req: Request, res: Response) {
  try {
    const RecommendationData:GetRecommendation=req.body;

    if (!RecommendationData.name || !RecommendationData.youtubeLink) return res.sendStatus(400);

    const result = await recommendationService.saveRecommendation(
      RecommendationData.name,
      RecommendationData.youtubeLink
    );

    if (result === null) {
      return res.sendStatus(422);
    }

    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function upvoteRecommendation(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const result = await recommendationService.upvoteRecommendation(id);

    if (result === null) {
      return res.sendStatus(404);
    }

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function downvoteRecommendation(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const result = await recommendationService.downvoteRecommendation(id);

    if (result === null) {
      return res.sendStatus(404);
    }

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function getRandomRecommendations(req: Request, res: Response) {
  try {
    const recommendations =
      await recommendationService.getRandomRecommendation();
    res.send(recommendations);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
