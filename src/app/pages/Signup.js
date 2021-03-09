import React from 'react';
import { useForm } from 'react-hook-form';
import '@css/pages/Signup.css';
import { BackButton } from '@components';

const Signup = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const onSubmit = async (data, e) => {
    let fs = document.getElementById('subp');
    fs.classList.remove('hidden');
    let params = {
      userName: data.username,
      email: data.email,
      password: data.password,
      name: data.name,
      school: data.school,
      zipCode: data.zipCode,
      gradeTaught: data.gradeTaught,
      classSize: data.classSize,
      schoolAddress: data.schoolAddress,
      schoolDistrict: data.schoolDistrict,
      role: 'teacher',
      city: data.city,
      state: data.state,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'FINancials Junior GM',
      },
      body: JSON.stringify(params),
    };
    try {
      const fetchResult = await fetch(
        'https://www.finjuniorgmapi.com/api/v1/auth/register',
        requestOptions
      );
      const result = await fetchResult.json();
      if (fetchResult.ok) {
        alert(
          'Thank you for signing up! Instructions and a curriculum guide will be emailed to you shortly.'
        );
        fs.classList.add('hidden');

        e.target.reset();
      } else {
        const message = result.message;
        fs.classList.add('hidden');
        if (message) {
          alert('Server Error. Could not register. ' + message);
        } else {
          alert('Server Error. Could not register. Try again');
        }
      }
    } catch (e) {
      alert('Server Error. Could not register.' + e);
    }
  };
  return (
    <div className='signup-form-container box-shadow'>
      <h2 id='inst' style={{ fontSize: '1.8rem' }}>
        This page is for teacher registration only!
      </h2>
      <div id='backdiv'>
        <BackButton path='/dashboard' />
      </div>
      <div className='formdiv'>
        <h4 className='color-primary form-title'>
          Complete the form to register as a teacher!
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Your Name</h4>
          {errors.name && errors.name.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          {errors.name && errors.name.type === 'pattern' && (
            <p className='error'>Please enter a valid name.</p>
          )}
          <input
            name='name'
            ref={register({
              required: true,
              maxLength: 20,
              pattern: /^[a-zA-Z].*[\s]*$/,
            })}
          />
          <h4>Email Address</h4>
          {errors.email && errors.email.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p className='error'>Please enter a valid email.</p>
          )}
          <input
            name='email'
            type='email'
            ref={register({
              required: true,
              maxLength: 20,
              pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            })}
          />
          <h4>School Name</h4>
          {errors.school && errors.school.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          {errors.school && errors.school.type === 'pattern' && (
            <p className='error'>Please enter a valid name.</p>
          )}
          <input
            name='school'
            ref={register({
              required: true,
              maxLength: 30,
              pattern: /^[a-zA-Z].*[\s]*$/,
            })}
          />
          <h4>School District</h4>
          {errors.schoolDistrict &&
            errors.schoolDistrict.type === 'required' && (
              <p className='error'>This is required.</p>
            )}
          <input
            name='schoolDistrict'
            ref={register({
              required: true,
              maxLength: 30,
              pattern: /^[a-zA-Z].*[\s]*$/,
            })}
          />
          <h4>School Address</h4>
          {errors.schoolAddress && errors.schoolAddress.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          <input name='schoolAddress' ref={register({ required: true })} />
          <h4>City</h4>
          {errors.city && errors.city.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          <input
            name='city'
            ref={register({
              required: true,
              maxLength: 30,
              pattern: /^[a-zA-Z].*[\s]*$/,
            })}
          />
          <h4>State</h4>
          {errors.state && errors.state.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          <div
            id='selectdiv'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <select name='state' ref={register({ required: true })}>
              <option value='AL'>Alabama</option>
              <option value='AK'>Alaska</option>
              <option value='AZ'>Arizona</option>
              <option value='AR'>Arkansas</option>
              <option value='CA'>California</option>
              <option value='CO'>Colorado</option>
              <option value='CT'>Connecticut</option>
              <option value='DE'>Delaware</option>
              <option value='DC'>District Of Columbia</option>
              <option value='FL'>Florida</option>
              <option value='GA'>Georgia</option>
              <option value='HI'>Hawaii</option>
              <option value='ID'>Idaho</option>
              <option value='IL'>Illinois</option>
              <option value='IN'>Indiana</option>
              <option value='IA'>Iowa</option>
              <option value='KS'>Kansas</option>
              <option value='KY'>Kentucky</option>
              <option value='LA'>Louisiana</option>
              <option value='ME'>Maine</option>
              <option value='MD'>Maryland</option>
              <option value='MA'>Massachusetts</option>
              <option value='MI'>Michigan</option>
              <option value='MN'>Minnesota</option>
              <option value='MS'>Mississippi</option>
              <option value='MO'>Missouri</option>
              <option value='MT'>Montana</option>
              <option value='NE'>Nebraska</option>
              <option value='NV'>Nevada</option>
              <option value='NH'>New Hampshire</option>
              <option value='NJ'>New Jersey</option>
              <option value='NM'>New Mexico</option>
              <option value='NY'>New York</option>
              <option value='NC'>North Carolina</option>
              <option value='ND'>North Dakota</option>
              <option value='OH'>Ohio</option>
              <option value='OK'>Oklahoma</option>
              <option value='OR'>Oregon</option>
              <option value='PA'>Pennsylvania</option>
              <option value='RI'>Rhode Island</option>
              <option value='SC'>South Carolina</option>
              <option value='SD'>South Dakota</option>
              <option value='TN'>Tennessee</option>
              <option value='TX'>Texas</option>
              <option value='UT'>Utah</option>
              <option value='VT'>Vermont</option>
              <option value='VA'>Virginia</option>
              <option value='WA'>Washington</option>
              <option value='WV'>West Virginia</option>
              <option value='WI'>Wisconsin</option>
              <option value='WY'>Wyoming</option>
            </select>
          </div>
          <br className='iph'></br>
          <h4>School Zip Code</h4>
          {errors.zipCode && errors.zipCode.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          {errors.zipCode && errors.zipCode.type === 'minLength' && (
            <p className='error'>Please enter a valid zipcode.</p>
          )}
          <input
            name='zipCode'
            type='number'
            ref={register({ required: true, minLength: 5 })}
          />
          <br className='iph'></br>
          <br className='iph'></br>
          <div
            id='formnest'
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 'auto',
              marginRight: 'auto',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4>Grade Taught</h4>
              {errors.gradeTaught && errors.gradeTaught.type === 'required' && (
                <p className='error'>Required</p>
              )}
              {errors.gradeTaught &&
                (errors.gradeTaught.type === 'min' ||
                  errors.gradeTaught.type === 'max') && (
                  <p className='error'>Invalid Grade</p>
                )}
              <input
                name='gradeTaught'
                type='number'
                ref={register({ required: true, min: 1, max: 12 })}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h4>Class Size</h4>
              {errors.classSize && errors.classSize.type === 'required' && (
                <p className='error'>Required</p>
              )}
              <input
                name='classSize'
                type='number'
                ref={register({ required: true, min: 1, max: 1500 })}
              />
            </div>
          </div>
          <br className='iph'></br>
          <br className='iph'></br>
          <br className='iph'></br>
          <h4>Create a Username</h4>
          {errors.username && errors.username.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          <input
            name='username'
            ref={register({ required: true, maxLength: 30 })}
          />
          <h4>Create a Password</h4>
          {errors.conf && errors.conf.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          {errors.conf && errors.conf.type === 'minLength' && (
            <p className='error'>Password must be atleast 7 characters.</p>
          )}
          <input
            name='conf'
            type='password'
            id='cpw'
            ref={register({ required: true, minLength: 7 })}
          />
          <h4>Confirm Password</h4>
          {errors.password && errors.password.type === 'required' && (
            <p className='error'>This is required.</p>
          )}
          {errors.password && errors.password.type === 'validate' && (
            <p className='error'>Passwords do not match.</p>
          )}
          <input
            name='password'
            type='password'
            id='pw'
            ref={register({
              validate: (value) => {
                return value === watch('conf');
              },
              required: true, // value is from password2 and watch will return value from password1
            })}
          />
          <br></br>
          <p id='subp' className='hidden' style={{ margin: 'auto' }}>
            Processing...
          </p>
          <input
            id='formsubmit'
            type='submit'
            style={{
              color: Object.keys(errors).length === 0 ? '#00788a' : 'black',
              backgroundColor:
                Object.keys(errors).length === 0 ? '#EA7200' : 'grey',
              margin: 'auto',
              height: '48px',
            }}
          />
        </form>
      </div>
    </div>
  );
};
export default Signup;
