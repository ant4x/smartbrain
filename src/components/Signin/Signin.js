import React from "react"
import "./Signin.css"

const Signin = ({ onRouteChange, loadUser }) => {

    const [signInEmail, setSignInEmail] = React.useState("")
    const [signInPassword, setSignInPassword] = React.useState("")

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value)
    }

    const onSubmitSignIn = () => {
        fetch("https://shrouded-harbor-48513.herokuapp.com/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
            .then(res => res.json())
            .then(user => {
                user.id && loadUser(user)
                user.id && onRouteChange("home")
            })
    }

    return (
        <article className="br3 ba silver mv4 w-100 w-50-m w-25-l mw6 center bg-gold shadow-5 card-bg">
            <main className="pa4 white-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw4 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba b--white-50 bg-transparent hover-bg-white-50 w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba b--white-50 bg-transparent hover-bg-white-50 w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onSubmitSignIn}
                            className="btn b ph3 pv2 input-reset white-80 ba b--black-50 hover-bg-gold bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange("register")} className="f6 link moon-gray db hover-white grow pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Signin

// TO DO: need to refactor "Signin" and "Register" creating a "Form" component