/* eslint-disable react-hooks/rules-of-hooks */
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    // const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
    };
    return (
        <div>
            <div className='loginContainer'>

                <div>
                    {/* <img className='login-img ' src={loginImg} alt="" /> */}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h2 className="text-center text-4xl font-bold">Login</h2>

                    <div className="lg:ml-16 form-control border-0">
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


                    <div className="lg:ml-16 form-control  border-0">
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

                    <input type="submit" className='lg:ml-20 ml-3 form-button text-white ' value="Login" />
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