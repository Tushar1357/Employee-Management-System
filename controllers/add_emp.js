const mongoose = require('mongoose')


mongoose.connect('')

const schema = mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    salary: {type: Number,required: true},
    empid: {type: String, required:true,unique:true},
    phno: {type:Number,required:true},
    date: {type: Date,default: Date.now}
})

const emp_model = mongoose.model('emp',schema,'emp_details')

const find_user = async(info)=>{
    const user = await emp_model.findOne({empid:info.empid})
    try{
    if (user){
        return false
    }
    return true
}
catch{

}
}


const add_user = async(info)=>{
    if (await find_user(info)){
        try{
            await emp_model.create(info)
            return true
        }
        catch(error){
            console.error(error)
        }
    }
    return false
}


const get_emp = async()=>{
    try{
        const result = await emp_model.find({})
        return result
    }
    catch{

    }
}

const delete_emp = async(info)=>{
    if (!(await find_user(info))){
        try{
            await emp_model.deleteOne({empid: info.empid})
            return true
        }
        catch(error){
            console.error(error)
        }
    }
    return false
}

const delete_all = async()=>{
    try{
        await emp_model.deleteMany({})
        return true
    }
    catch (error){
        console.log(error)
        return false
    }
}


const edit = async(info)=>{
    if (!(await find_user(info))){
        try{
            await emp_model.updateOne({empid: info.empid},{fname: info.fname,lname:info.lname,salary: info.salary,phno: info.phno})
            return true
        }
        catch(error){
            console.error(error)
        }
    }
    return false
}
module.exports = {add_user,get_emp,delete_emp,delete_all,edit}