import { useId, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import classes from './signup.module.css'
import { useForm, SubmitHandler } from "react-hook-form"
import SignupForm from "../../types/signup-form.type"

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const signupSchema = yup.object({
    email: yup.string().required().email().typeError('no valid email'),
    password: yup.string().required(),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'passwords must match'),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    birthdate: yup.date().default(() => new Date('1995-03-13'))
})

const Signup = () => {
  
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            email: 'test@test.be',
            password: 'retour',
            confirmPassword: 'retour',
            firstname: 'ret',
            lastname: 'tour',
            birthdate: '1995-03-13'

        },
        resolver: yupResolver(signupSchema)
    })

    const id = useId()

    const navigate = useNavigate()

    const handleSignup: SubmitHandler<SignupForm> = (userInfo) => {
        const dateFormat = new Date(userInfo.birthdate).toISOString()
        const body = {
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            password: userInfo.password,
            birthdate: dateFormat
        }

        axios.post('http://localhost:3000/users/signup',body)
            .then(res => {
                localStorage.setItem('tokenObj', JSON.stringify(res.data))
                navigate('/')
            })
            .catch(err => console.log(err))

    }

    return (
    <form className={classes.login} onSubmit={handleSubmit(handleSignup)}>
        <h2>Personnal Info</h2>
        <div>
            <label htmlFor={"email" + id}>Email:</label>
            <input type="text" id={"email" + id} {...register('email')}/>
        </div>
        <div>
            <label htmlFor={"password" + id}>Password:</label>
            <input type="password" id={"password" + id} {...register('password')}/>
        </div>
        <div>
            <label htmlFor={"confirmPassword" + id}>Confirm Password:</label>
            <input type="password" id={"confirmPassword" + id} {...register('confirmPassword')}/>
        </div>
        <div>
            <label htmlFor={"firstname" + id}>First Name:</label>
            <input type="text" id={"firstname" + id} {...register('firstname')}/>
        </div>
        <div>
            <label htmlFor={"lastname" + id}>Last Name:</label>
            <input type="text" id={"lastname" + id} {...register('lastname')}/>
        </div>
        <div>
            <label htmlFor={"birthdate" + id}>DOB:</label>
            <input type="date" id={"birthdate" + id} {...register('birthdate')}/>
        </div>
        <button type="submit">Sign up</button>
    </form>
    )
}

export default Signup