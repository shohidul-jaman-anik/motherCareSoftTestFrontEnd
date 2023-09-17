/* eslint-disable react-hooks/rules-of-hooks */
import style from "@/styles/Login.module.css";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import registerImg from "../../assets/Sign up-pana.svg";


const register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const router = useRouter()

    const onSubmit = async data => {
        console.log(data)
        fetch(`http://localhost:5000/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log("result", result)
                toast.success("Account Successfully Created")
                router.push("/auth/login")

            }).catch(error => {
                console.log(error)
                router.push("/auth/register")
                toast.error(error.message)
            })
    }
    return (
        <div>
            <Head>
                <title>Registration Page</title>
                <meta name="Registration Page" description="Registerd in mother care" />
            </Head>
            <div className={style.loginContainer}>

                <div>
                    {/* <img className='login-img ' src={SignUpImg} alt="" /> */}
                    <Image src={registerImg}
                        className='login-img '
                        alt="img2" width={450} height={400} layout="responsive" />

                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h2 className="text-center text-4xl font-bold mb-8">Sign Up</h2>


                    <div className="lg:ml-40 form-control border-0">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="input input-bordered input-primary w-full max-w-xs "
                            {...register("name")}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}


                        </label>
                    </div>

                    <div className="lg:ml-40 form-control border-0">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="input input-bordered input-primary w-full max-w-xs "

                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Email is required"
                                },

                            })}
                        />
                        <label className="label">
                            {errors.username?.type === 'required' && <span className="label-text-alt text-red-500">{errors.username.message}</span>}
                        </label>
                    </div>

                    <div className="lg:ml-40 form-control  border-0">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered input-primary w-full max-w-xs"
                            // {...register("firstName", { required: true })}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Password is required"
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Must be 6 characters or longer'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                        </label>

                    </div>

                    <input type="submit" className={`${style.formButton} lg:ml-40 ml-3 text-white`} value="SignUp" />

                    <p className='text-center mt-2'><small>
                        Already have an account ?
                        <Link className='text-primary ml-2'
                            href='/auth/login'>Please login
                        </Link></small>
                    </p>


                </form>

            </div>
        </div>
    );
};

export default register;