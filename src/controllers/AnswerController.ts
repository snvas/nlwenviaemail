import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUserRepository";
import { AppError } from "../errors/AppError";


class AnswerController {

    // http://localhost:3333/answers/1?u=952dd379-8338-4777-9cb6-bf35948672ab

    /**
     * 
     Route params => Parametros que compõe a rota
     routes.get("/answers/:value")

     Query Params => Busca, Paginaçao, não obrigatória
     ?
     chave=valor
     
     */

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) {
            throw new AppError("SurveyUser does not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);


    }


}

export { AnswerController }