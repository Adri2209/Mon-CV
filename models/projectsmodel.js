import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nom obligatoire"]
    },
    image: {
        type: String,
    },
    githubLink: {
        type: String,
        required: [true, "lien obligatoire"]
    },
    projectLink: {
        type: String,
        require: [true, "lien obligatoire"]
    }
  
})

const projectModel = mongoose.model("projets", projectSchema)
export default projectModel