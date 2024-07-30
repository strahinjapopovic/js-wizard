import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
//--------------------------------------------//
const Signup = () => {
  const [formState, setFormState] = useState({firstName: '', lastName: '', username: '', email: '', password: '', });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  //--------------------------------------------//
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value, });
  };
  //--------------------------------------------//
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }
  };
  //--------------------------------------------//
  const shevron = ` >>>`;
  return (
    <div id="top">
      <section className="input-login-form" >
        <div id="input-login-sec">
          {data ? (<p>Loading...<Link to={{ pathname: "/dashboard"}}></Link></p>) : 
           (<form onSubmit={handleFormSubmit}>
            <table id="signup-tbl">
              <tbody>
                <tr>
                  <td><label htmlFor="firstName">First Name</label></td>
                  <td><label htmlFor="lastName">Last Name</label></td>
                </tr>
                <tr>
                  <td><input placeholder="Your first name" name="firstName" type="text" value={formState.firstName} onChange={handleChange} /></td>
                  <td><input placeholder="Your last name" name="lastName" type="text" value={formState.lastName} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td colSpan={2}><label htmlFor="username">Username</label></td>
                </tr>
                <tr>
                  <td colSpan={2}><input placeholder="Your username" name="username" type="text" value={formState.username} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td colSpan={2}><label htmlFor="email">Email</label></td>
                </tr>
                <tr>
                  <td colSpan={2}><input type="text" id="email" name="email" placeholder="Insert your email" value={formState.email} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td colSpan={2}><label htmlFor="password">Password</label></td>
                </tr>
                <tr>
                  <td colSpan={2}><input type="password" id="password" name="password" placeholder="Insert password" value={formState.password} onChange={handleChange}/></td>
                </tr>
                <tr>
                  <td colSpan={2}><button type="submit" id="submit" name="submit">Signup<span id="shevron">{shevron}</span></button></td>
                </tr>
                <tr>
                  <td colSpan={2}>{error && (<div id="error-message">{error.message}</div>)}</td>
                </tr>
              </tbody>
            </table>
          </form>)}
        </div>
      </section>
    </div>
  );
};
//--------------------------------------------//
export default Signup;
