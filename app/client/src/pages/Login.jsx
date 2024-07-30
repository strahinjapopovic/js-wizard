import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
//--------------------------------------------//
const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  //--------------------------------------------//
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  //--------------------------------------------//
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }
  //--------------------------------------------//
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  //--------------------------------------------//
  const shevron = ` >>>`;
  return (
    <div id="top">
      <section className="input-login-form" >
        <div id="input-login-sec">
          {data ? (<p>Loading...<Link to="/profile" relative="path"></Link></p>) : 
          (<form onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Insert your email" value={formState.email} onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Insert password" value={formState.password} onChange={handleChange}/>
            <button type="submit" id="submit" name="submit">Login<span id="shevron">{shevron}</span></button>
            {error && (<div id="error-message">{error.message}</div>)}
          </form>)}
        </div>
      </section>
    </div>
  );
};
//--------------------------------------------//
export default Login;
