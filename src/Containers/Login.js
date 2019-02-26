import React from 'react'
import { Button, Grid, Header, Image, Segment } from 'semantic-ui-react'

const Login = props => {

  return (
    <div>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' textAlign='center'>
            Welcome to Bubble Burster!
          </Header>
          <Header as='h2' color='black' textAlign='center'>
             Log-in to your account
          </Header>
              <Button as="a" href={"http://localhost:3000/api/v1/login"} color='blue' fluid size='large'>
                Login
              </Button>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Login
