require("dotenv-safe").load();
var jwt = require("jsonwebtoken");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:3001/meteor";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectId;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(url, (err, client) => {
  if (err) {
    return console.log(err);
  }

  db = client.db("meteor");

  app.listen(4321, () => {
    console.log("escutando em localhost:4321");
  });

  app.get("/", (req, res) => {
    res.send("Hello Reservas.com!");
  });

  //Para criar um usuário
  app.post("/api/Usuarios", (req, res) => {
    console.log(req.body);
    //Para evitar duplicidade de nome de usuário
    db.collection("Usuarios").findOne(
      { username: req.body.username },
      (err, result) => {
        if (err) {
          res.send(err);
        }
        console.log(result);
        if (result) {
          res.status(500).send("Nome de usuário já existente!");
        } else {
          db.collection("Usuarios").insertOne(req.body, (err, result) => {
            if (err) {
              res.send(err);
            }
            res.send(req.body);
          });
        }
      }
    );
  });

  //Para visualizar todos os usuários
  app.get("/api/Usuarios", (req, res) => {
    db.collection("Usuarios")
      .find()
      .toArray((err, results) => {
        if (err) {
          res.send(err);
        }

        res.send(results);
      });
  });

  //Para logar um usuário
  app.post("/api/Usuarios/login", (req, res, next) => {
    console.log(req.body);
    db.collection("Usuarios").findOne(
      { username: req.body.username },
      (err, result) => {
        if (err) {
          res.send(err);
        }
        console.log(result);
        if (result) {
          if (req.body.password == result.password) {
            let id = new ObjectId(result._id);
            var token = jwt.sign({ id }, process.env.SECRET, {
              expiresIn: 600 // expires in 10min
            });
            res.status(200).send({ auth: true, token: token });
          } else {
            res.status(500).send("Senha inválido!");
          }
        } else {
          res.status(500).send("Login inválido!");
        }
      }
    );
  });

  //Para fazer logout
  app.get("/api/Usuarios/logout", function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });

  function verifyJWT(req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

  // ................................. Reservas .......................................

  //Para cadastrar uma reserva
  app.post("/Reserva", verifyJWT, (req, res) => {
    console.log(req.body);

    db.collection("reservas").insertOne(req.body, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(req.body);
    });
  });

  //Para visualizar todas as reservas
  app.get("/Reserva", verifyJWT, (req, res) => {
    db.collection("reservas")
      .find()
      .toArray((err, results) => {
        if (err) {
          res.send(err);
        }
        res.send(results);
      });
  });

  //Para buscar reserva por Id
  app.get("/Reserva/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);

    db.collection("reservas").findOne({ _id: id }, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(result);
    });
  });

  //Para alterar uma reserva
  app.put("/Reserva/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);

    db.collection("reservas").updateOne(
      { _id: id },
      {
        $set: {
          nome: req.body.nome,
          imagem: req.body.imagem,
          cidade: req.body.cidade,
          valorDiaria: req.body.valorDiaria,
          reservas: req.body.reservas
        }
      },
      (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
      }
    );
  });

  //Para deletar uma reserva
  app.delete("/Reserva/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);
    db.collection("reservas").deleteOne({ _id: id }, (err, result) => {
      if (err) return res.send(err);
      res.redirect({});
    });
  });

  // ................................. Curitiba .......................................

  //Para cadastrar um hotel em Curitiba
  app.post("/hotel/Curitiba", verifyJWT, (req, res) => {
    console.log(req.body);

    db.collection("curitiba").insertOne(req.body, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(req.body);
    });
  });

  //Para visualizar todos os hoteis cadastrados em curitiba
  app.get("/hotel/Curitiba", verifyJWT, (req, res) => {
    db.collection("curitiba")
      .find()
      .toArray((err, results) => {
        if (err) {
          res.send(err);
        }
        res.send(results);
      });
  });

  //Para buscar os cadastros de hoteis por Id
  app.get("/hotel/Curitiba/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);

    db.collection("curitiba").findOne({ _id: id }, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(result);
    });
  });

  //Para alterar um cadastro de hotel em Curitiba
  app.put("/hotel/Curitiba/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);

    db.collection("curitiba").updateOne(
      { _id: id },
      {
        $set: {
          nome: req.body.nome,
          imagem: req.body.imagem,
          cidade: req.body.cidade,
          valorDiaria: req.body.valorDiaria,
          reservas: req.body.reservas
        }
      },
      (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
      }
    );
  });

  //Para deletar um cadastro de hotel em Curitiba
  app.delete("/hotel/Curitiba/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);
    db.collection("curitiba").deleteOne({ _id: id }, (err, result) => {
      if (err) return res.send(err);
      res.redirect({});
    });
  });

  // ................................. Recife .......................................

  //Para cadastrar um hotel em Recife
  app.post("/hotel/Recife", verifyJWT, (req, res) => {
    console.log(req.body);

    db.collection("recife").insertOne(req.body, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(req.body);
    });
  });

  //Para visualizar todos os hoteis cadastrados em Recife
  app.get("/hotel/Recife", verifyJWT, (req, res) => {
    db.collection("recife")
      .find()
      .toArray((err, results) => {
        if (err) {
          res.send(err);
        }
        res.send(results);
      });
  });

  //Para buscar os cadastros de hoteis por Id
  app.get("/hotel/Recife/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);

    db.collection("recife").findOne({ _id: id }, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(result);
    });
  });

  //Para alterar um cadastro de hotel em Recife
  app.put("/hotel/Recife/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);

    db.collection("recife").updateOne(
      { _id: id },
      {
        $set: {
          nome: req.body.nome,
          imagem: req.body.imagem,
          cidade: req.body.cidade,
          valorDiaria: req.body.valorDiaria,
          reservas: req.body.reservas
        }
      },
      (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
      }
    );
  });

  //Para deletar um cadastro de hotel em Recife
  app.delete("/hotel/Recife/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);
    db.collection("recife").deleteOne({ _id: id }, (err, result) => {
      if (err) return res.send(err);
      res.redirect({});
    });
  });

  // ................................. Salvador .......................................

  //Para cadastrar um hotel em Salvador
  app.post("/hotel/Salvador", verifyJWT, (req, res) => {
    console.log(req.body);

    db.collection("salvador").insertOne(req.body, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(req.body);
    });
  });

  //Para visualizar todos os hoteis cadastrados em Salvador
  app.get("/hotel/Salvador", verifyJWT, (req, res) => {
    db.collection("salvador")
      .find()
      .toArray((err, results) => {
        if (err) {
          res.send(err);
        }
        res.send(results);
      });
  });

  //Para buscar os cadastros de hoteis por Id
  app.get("/hotel/Salvador/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);

    db.collection("salvador").findOne({ _id: id }, (err, result) => {
      if (err) {
        res.send(err);
      }

      res.send(result);
    });
  });

  //Para alterar um cadastro de hotel em Salvador
  app.put("/hotel/Salvador?:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);

    db.collection("salvador").updateOne(
      { _id: id },
      {
        $set: {
          nome: req.body.nome,
          imagem: req.body.imagem,
          cidade: req.body.cidade,
          valorDiaria: req.body.valorDiaria,
          reservas: req.body.reservas
        }
      },
      (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
      }
    );
  });

  //Para deletar um cadastro de hotel em Salvador
  app.delete("/hotel/Salvador/:id", verifyJWT, (req, res) => {
    let id = new ObjectId(req.params.id);
    db.collection("salvador").deleteOne({ _id: id }, (err, result) => {
      if (err) return res.send(err);
      res.redirect({});
    });
  });
});
