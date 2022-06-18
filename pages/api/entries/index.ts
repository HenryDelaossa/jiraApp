import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { EntryModel, IEntry } from '../../../models';

type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)
        case 'POST':
            return postEntries(req, res)

        default:
            return res.status(400).json({ message: 'No existe el Endpoint' })
    }

}


/**
 * It connects to the database, finds all the entries, sorts them by date, disconnects from the
 * database, and returns the entries.
 * @param res - NextApiResponse<Data>
 * @returns An array of objects.
 */
const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await EntryModel.find().sort({ createdAt: 'ascending' });

    await db.disconnect();

    return res.status(200).json(entries)

}

/**
 * It receives a request and a response, it creates a new entry in the database and returns the new
 * entry in the response.
 * @param {NextApiRequest} req - NextApiRequest: This is the request object. It contains information
 * about the request, such as the URL, headers, and body.
 * @param res - NextApiResponse<Data>
 * @returns The response is a JSON object with the following structure:
 */
const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description = '' } = req.body;
    const newEntry = new EntryModel({
        description,
        createdAt: Date.now()
    })

    try {

        await db.connect()
        await newEntry.save()
        await db.disconnect()
        return res.status(201).json(newEntry)

    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(500).json({message:'ups, salio algo mall revisa clg del servidor'})
    }

}