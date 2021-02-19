import mongoose from 'mongoose'

const HarvestSchema = new mongoose.Schema({
    farmer_name:{
        type: String,
        trim: true,
        required: 'Name is required'
    },
    officer_name:{
        type:String,
        trim:true,
        required:'Officer name is required'
    },
    address:{
        type:String,
        required:'address is required'
    },
    contact_no:{
        type:Number,
        required:'enter number'

    },
    vegetable_type:{
        type:String,
        trim:true,
        required:'type need to provided'
    },
    vegetable_grade:{
        type:String,
    },
    plant_date:{
        type:Date,
    },

    harvest_date:{
        type:Date
    },
    amount:{
        type:Number,
        required:"Amount in required"
    }
})
export default mongoose.model('Harvest',HarvestSchema)