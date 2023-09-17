/* eslint-disable react-hooks/rules-of-hooks */
import style from "@/styles/Login.module.css";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import loginImg from "../../assets/Sign in-pana.svg";

const login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const router = useRouter()
    // const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        fetch(`http://localhost:5000/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                // if (result.success) {
                //     localStorage.setItem("token", result.token)
                //     console.log("result", result)
                //     router.push("/dashboard")
                // } else {
                //     toast.error(result.message)
                //     router.push("/auth/login")
                // }

            }).catch(error => {
                // console.log(error)
                // toast.error(error.message)
                // router.push("/auth/login")
            })
    };
    return (
        <div>
            <Head>
                <title>Login Page</title>
                <meta name="Login Page" description="Login Mother care" />
            </Head>
            <div className={style.loginContainer}>

                <div>

                    <Image src={loginImg}
                        className='login-img '
                        alt="img2" width={450} height={420} layout="responsive" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h2 className="text-center text-4xl font-bold">Login</h2>

                    <div className="lg:ml-40 form-control border-0">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Your Name"
                            className="input input-bordered input-primary w-full max-w-xs "
                            // {...register("firstName", { required: true })}
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Name is required"
                                },

                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}


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

                    <input type="submit" value="Login" className={`${style.formButton} lg:ml-40 ml-3 text-white`} />

                    <p className='text-center mt-2'><small>
                        New To Mother Care ?
                        <Link className='text-primary ml-2'
                            href='/auth/register'>Create New Account
                        </Link></small>
                    </p>

                </form>

            </div>
        </div>
    );
};

export default login;