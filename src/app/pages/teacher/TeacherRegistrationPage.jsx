import { useState } from 'react';
import {
  BackButton,
  LoadingSpinner,
  OverlayBoard,
  Button,
  Overlay,
} from '@components';
import { useForm } from 'react-hook-form';
import { registerTeacher } from '../../api-helper';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '@redux/actions';
import '@css/pages/TeacherRegistrationPage.css';

export const TeacherRegsitrationPage = ({ history }) => {
  const { register, handleSubmit, errors, watch } = useForm();

  const [isRegistering, setIsRegistering] = useState(false);

  const dispatch = useDispatch();

  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = async (data, e) => {
    setIsRegistering(true);

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

    registerTeacher(params)
      .then((res) => {
        console.log('RES:::: ', res);
        e.target.reset();
        setIsRegistering(false);
        setIsRegistered(true);

        dispatch(
          toggleOverlay({
            isOpen: true,
            canClose: false,
            template: (
              <OverlayBoard>
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '6rem 0 3rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <h3
                      className="color-primary"
                      style={{ marginBottom: '2rem', fontSize: '2.15rem' }}
                    >
                      Thank you for registering for the FINancials Junior GM
                      program presented by Comerica.
                    </h3>
                    <p
                      className="color-primary"
                      style={{ fontSize: '1.75rem', lineHeight: '3rem' }}
                    >
                      Click here to sign in and register your class.
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: '3rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      width: '100%',
                    }}
                  >
                    <Button
                      text="Sign In"
                      onClick={() => {
                        history.push('/login/teacher');
                        toggleOverlay({
                          isOpen: false,
                          template: null,
                        });
                      }}
                    />
                  </div>
                </div>
              </OverlayBoard>
            ),
          })
        );
      })
      .catch((err) => {
        alert('Server Error. Could not register.' + err);
        setIsRegistering(false);
      });
  };

  return (
    <div className="page-container teacher-registration-page-container">
      <div className="teacher-registration-page-header">
        <span className="back-btn-wrap">
          <BackButton path="/dashboard" />
        </span>

        <h2>This page is for teacher registration only!</h2>
      </div>

      <div className="teacher-registration-page-body">
        <div className="teacher-registration-page-form-wrap box-shadow">
          <h4 className="color-primary">
            Complete the form to register as a teacher
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            {errors.name && errors.name.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            {errors.name && errors.name.type === 'pattern' && (
              <p className="error">Please enter a valid name.</p>
            )}
            <input
              name="name"
              ref={register({
                required: true,
                maxLength: 20,
                pattern: /^[a-zA-Z].*[\s]*$/,
              })}
            />
            <label htmlFor="email">Email Address</label>
            {errors.email && errors.email.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <p className="error">Please enter a valid email.</p>
            )}
            <input
              name="email"
              type="email"
              ref={register({
                required: true,
                maxLength: 20,
                pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
              })}
            />
            <label htmlFor="school">School Name</label>
            {errors.school && errors.school.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            {errors.school && errors.school.type === 'pattern' && (
              <p className="error">Please enter a valid name.</p>
            )}
            <input
              name="school"
              ref={register({
                required: true,
                maxLength: 30,
                pattern: /^[a-zA-Z].*[\s]*$/,
              })}
            />
            <label htmlFor="district">School District</label>
            {errors.schoolDistrict &&
              errors.schoolDistrict.type === 'required' && (
                <p className="error">*Required.</p>
              )}
            <input
              name="schoolDistrict"
              ref={register({
                required: true,
                maxLength: 30,
                pattern: /^[a-zA-Z].*[\s]*$/,
              })}
            />
            <label htmlFor="address">School Address</label>
            {errors.schoolAddress &&
              errors.schoolAddress.type === 'required' && (
                <p className="error">*Required.</p>
              )}
            <input name="schoolAddress" ref={register({ required: true })} />
            <label htmlFor="city">City</label>
            {errors.city && errors.city.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            <input
              name="city"
              ref={register({
                required: true,
                maxLength: 30,
                pattern: /^[a-zA-Z].*[\s]*$/,
              })}
            />
            <label htmlFor="state">State</label>
            {errors.state && errors.state.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            <select name="state" ref={register({ required: true })}>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <label htmlFor="zip">School Zip Code</label>
            {errors.zipCode && errors.zipCode.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            {errors.zipCode && errors.zipCode.type === 'minLength' && (
              <p className="error">Please enter a valid zipcode.</p>
            )}
            <input
              name="zipCode"
              type="number"
              ref={register({ required: true, minLength: 5 })}
            />

            <div className="form-columns-wrap">
              <div>
                <label htmlFor="grade">Grade Taught</label>
                {errors.gradeTaught &&
                  errors.gradeTaught.type === 'required' && (
                    <p className="error">Required</p>
                  )}
                {errors.gradeTaught &&
                  (errors.gradeTaught.type === 'min' ||
                    errors.gradeTaught.type === 'max') && (
                    <p className="error">Invalid Grade</p>
                  )}
                <input
                  className="col-1-input"
                  name="gradeTaught"
                  type="number"
                  ref={register({ required: true, min: 1, max: 12 })}
                />
              </div>

              <div>
                <label htmlFor="class-size">Class Size</label>
                {errors.classSize && errors.classSize.type === 'required' && (
                  <p className="error">Required</p>
                )}
                <input
                  className="col-2-input"
                  name="classSize"
                  type="number"
                  ref={register({ required: true, min: 1, max: 1500 })}
                />
              </div>
            </div>

            <label>Create a Username</label>
            {errors.username && errors.username.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            <input
              name="username"
              ref={register({ required: true, maxLength: 30 })}
            />
            <label htmlFor="password">Create a Password</label>
            {errors.conf && errors.conf.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            {errors.conf && errors.conf.type === 'minLength' && (
              <p className="error">Password must be at least 7 characters.</p>
            )}
            <input
              name="conf"
              type="password"
              id="cpw"
              ref={register({ required: true, minLength: 7 })}
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            {errors.password && errors.password.type === 'required' && (
              <p className="error">*Required.</p>
            )}
            {errors.password && errors.password.type === 'validate' && (
              <p className="error">Passwords do not match.</p>
            )}
            <input
              name="password"
              type="password"
              id="pw"
              ref={register({
                validate: (value) => {
                  return value === watch('conf');
                },
                required: true, // value is from password2 and watch will return value from password1
              })}
            />
            <div className="form-submit-wrap btn-accent btn-small">
              {isRegistering ? (
                <span className="reg-form-spinner-wrap">
                  <LoadingSpinner size="small" />
                </span>
              ) : (
                <input id="formsubmit" type="submit" />
              )}
            </div>
          </form>
        </div>
      </div>
      <div
        className="fixed-overlay-wrap"
        style={{
          opacity: isRegistered ? 1 : 0,
          zIndex: isRegistered ? 1 : -1,
        }}
      >
        <Overlay />
      </div>
    </div>
  );
};
