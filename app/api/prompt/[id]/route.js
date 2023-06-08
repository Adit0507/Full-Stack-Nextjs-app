import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

// GET
export const GET = async (req, { params }) => {
    try {
        await connectToDB()
        
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response("Prompt not foind", { status: 404 })
        
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

export const PATCH = async(req, { params }) => {
    const { prompt, tag } = await req.json()

    try{
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt){
            return new Response("Prompt not found", { status: 404 })
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag= tag

        return new Response("Succesfully updated the prompts 😉", { status: 200 })
    } catch(error){
        return new Response("Error updating the prompt", { status: 500 })
    }   
}

export const DELETE = async(req, { params }) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id)

        return new Response("Promopt deleted successfully", { status: 200 })
    } catch(error){
        return new Response("Error deleting prompt", { status: 500 })
    }
}