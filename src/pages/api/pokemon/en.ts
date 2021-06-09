import type { NextApiRequest, NextApiResponse } from 'next'

import * as partiql from "partiql-js"

import pokemon from '../../../../public/pokemon/en/pokemon.json';

const pokemonJson = JSON.stringify(pokemon);

export default async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
  const query = req.query.q ?? ""

  if (query) {
    try {
      let result = await partiql.evaluate(query as string, pokemonJson, "json", "json") ?? "";
      let data = JSON.parse(result);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ "message": e });
    }
  } else {
    res.status(400).json({ "message": "Require PartiQL for q query parameters" });
  }
}
