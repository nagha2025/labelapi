// import {SecretsManagerClient, GetSecretValueCommand} from "@aws-sdk/client-secrets-manager";

// const { Pool } = require('pg');

// var hostname,username,password;

// const client = new SecretsManagerClient({
//     region: 'us-east-1'
// });

// const command = new GetSecretValueCommand({
//     SecretId: process.env.RDS_SECRET_NAME,//lambda env with the secret name
//     VersionStage: "AWSCURRENT"
// });
// let sql;

// try {
//     const response = await client.send(command);
//     const secrets = JSON.parse(response['SecretString']);

//     // noinspection JSUnresolvedReference
//     sql = postgres({
//         hostname: secrets.dbhost,
//         username: secrets.username,
//         password: secrets.password
//     });
// } catch (e) {
//     console.error(e);
//     process.exit(1);
// }

// const pool = new Pool({
//   user: 'your_username',
//   password: 'your_password',
//   host: 'localhost',
//   port: 5432, // default Postgres port
//   database: 'your_database_name'
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params)
// };


const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_GUWdzYrmWL4uXY2QD9S",
    host: "shelflabel-iiits-0c05.c.aivencloud.com",
    port: 22171,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIUcgvpDTwm243ohfjLkH27m2K7MKswDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1Y2M1Y2Q4ZmYtNGIzNi00MzYwLTlhYzctMzhiOTVkNjc3
YzJlIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwODE3MTEyMjIxWhcNMzUwODE1MTEy
MjIxWjBAMT4wPAYDVQQDDDVjYzVjZDhmZi00YjM2LTQzNjAtOWFjNy0zOGI5NWQ2
NzdjMmUgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAKbYb3d19rTp1v6NI9vNw3u7sDJVpVeA9Rnrz1LGOXsmZl944uAepclE
jFjyEqwBRyQ683oEUmWULFnUaPx/Qpmtwrui+nn6ovksRM+4PvImrt02wZG6q1IH
UxYUKcAdAMTEKK/lKhysE3J00Ego5N7ASuSrCkErwubI3wlnstYNuhml7u7k6eLx
kgGHMu9Wd3lelAJFhQag7Ms6oMJFxxytL02SfZXsQuZranM9mYtY2sTkbbkr61wm
Rf0XZNI6yCN6/uAolHHfueARvfFhFRlJ7uVUrAFwH9NfY+sWWgdhEivMs/XXwky+
uVRjQ79bW1RkqvQYS5Lhv+sxrWIHmCbjW2ZCUlTYFaZBoz2k7BdiJx3IzmobeqSF
yVOckL0JT35abP2ICIw6G/v+GFL6ORABVTiyDCxKZm1HBwXo/r4X9N+8Vke66ywM
B7L+utZdwZ55p1zal5mo52zhjIHvZkEhgsl+MjbCGDeXyhKeviykKFkT9qnA9aYW
nV/GO/sCKQIDAQABo0IwQDAdBgNVHQ4EFgQUaiOGnqWiyL7UytJjMBbhnPbzPR0w
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBAAYX5ZiPGrY41D1ZHAJIB7YJt7RgiKlSJALauRhh1lLraej4kPd6QtZ/0j+G
VY5l6nORDB7U2pEcpP2Ywrl2EFbDSCdT2cix728W1AFidxwkAIcqzzo6RK4x6jNi
RjWe8t82YGViX0RAY8h/Fp/x4ZPZ7AYT92NDYDpKLuyqeZTWp1+FYGxwwk36P60K
cK4hwRxp+Sc8KTW18AsnnhClK/WStl5kUH6YOBtpFN7HKzcEbn/fIR/bpQ83ICVO
iZtNYC7/RUFFfdDdyG9NlLD+B9OjuKMdc+xmPg3eRBZ1GL0S84d1xTuqaXXANOEl
mMpzGvDQkN1hAagfXnujyT8sbZADF90kwjqNW2eay2HcQI5659KsKRAVZBUpGFgy
OzcONotRe7nvCtjfpFohI5/OdoMa4e3TCr+2ak2bQZ4sy0t5qC6Ha9W8E4D5rICV
vbRkdmbz0BijRcoNXFEs5mc/CRmTksq/2OgK5WFjvoZk1l13IEjeffpITHVn/g7g
i0eQig==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});
