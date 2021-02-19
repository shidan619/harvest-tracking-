import mongoose from 'mongoose'

const DemandSchema = new mongoose.Schema({
    demand_amount:{
        type: Number,
        required: 'Amount is required'
    },
    vegetable_type:{
        type:String,
        trim:true,
        required:'type need to provided'
    },
    demand_year:{
        type:Number,
        required:"Year is required"
    }
})
export default mongoose.model('Demand',DemandSchema)