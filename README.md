# Make and Receive Calls with JS and Vonage APIs

## Quick Start

### Clone and Install Dependencies

```bash
git clone https://github.com/sudiptog81/calls-with-js.git
cd calls-with-js
yarn
```

### Override Environment Variables

Create a file named `.env` as per the template given in `.env.example`. Get the values for Vonage specific variables from the [Vonage Dashboard](https://dashboard.nexmo.com/).

### Start an HTTP Tunnel with `ngrok`

Assuming `PORT` has a value of `5000` in `.env`.

```bash
ngrok http 5000
```

### Override WebHook URLs in [Vonage Dashboard](https://dashboard.nexmo.com/)

- Answer URL: `<ngrok-tunnel-url>/answer`
- Event URL: `<ngrok-tunnel-url>/event`

### Run the Application

```bash
yarn dev
```

### Call a Friend

Replace `<number>` with your friend's number and `<message>` with a custom message.

```bash
curl http://localhost:5000/call?to=<number>&msg=<message>
```

### Ask Them to Call Back

Note: They will be rick-rolled!

## License

The MIT Open-Source License.
