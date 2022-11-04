import React from "react"

const Register = ({ onRouteChange, loadUser }) => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] = React.useState("")

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitSignIn = () => {
        fetch("https://shrouded-harbor-48513.herokuapp.com/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
            .then(res => res.json())
            .then(user => {
                user.id && onRouteChange("home")
                loadUser(user)
            })
    }

    return (
        <article className="br3 ba silver mv4 w-100 w-50-m w-25-l mw6 center bg-gold shadow-5 card-bg">
            <main className="pa4 white-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw4 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba b--white-50 bg-transparent hover-bg-white-50 w-100"
                                type="text"
                                name="name"
                                id="name"
                                onChange={onNameChange}
                            />
                        </div>
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
                            value="Register"
                        />
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Register

// TO DO: refactor "Signin" and "Register" creating a "Form" component