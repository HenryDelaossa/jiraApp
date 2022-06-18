import type { NextApiRequest, NextApiResponse } from 'next'
// import mongoose from 'mongoose';
import { db } from '../../../../database';
import { EntryModel, IEntry } from '../../../../models';

type Data =
    | { message: string }
    | IEntry;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;
    // if (!mongoose.isValidObjectId(id)) {

    //     return res.status(400).json({ message: `el id ${id}, no es valido o no existe` })

    // }

    switch (req.method) {
        case "PUT":
            return updateEntry(req, res);
        case "GET":
            return getEntryById(req, res);
        default:
            return res.status(400).json({ message: `metodo no valido o no existe` })
    }

}



const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;
    await db.connect();
    const entryToUpdate = await EntryModel.findById(id);

    if (!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: 'no existe entraa con este id' });
    }

    const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

    try {
        // entryToUpdate.description = description;
        // entryToUpdate.status = status;
        // await entryToUpdate.save();
        const updateEntry = await EntryModel.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json(updateEntry!);

    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })
    }
}

const getEntryById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    await db.connect();
    const entryById = await EntryModel.findById(id);

    if (!entryById) {
        await db.disconnect();
        return res.status(400).json({ message: 'no existe entraa con este id' });
    }
    res.status(200).json(entryById)
}