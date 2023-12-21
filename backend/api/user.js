const express = require("express");
const ApiError = require("../core/error.js");
const { User } = require("../models/models.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const ownerMiddleware = require("../middleware/ownerMiddleware.js");
const generateJwt = require("../core/security.js");


let apiRouter = express.Router()

// login
apiRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { "email": email } });
    if (!user) return next(ApiError.notAuthenticated("Such user doesn't exists"))
    if (user.password != password) {
        return next(ApiError.notAuthenticated("Wrong email or password"));
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token });
})

// registrate
apiRouter.post("/", async (req, res) => {
    const { email, password, googleid } = req.body;
    const user = await User.create({ email, password, googleid });
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token });
});

// google
apiRouter.post('/callback/:provider', async (req, res) => {
    const { provider } = req.params;
    if (provider == "google") {
        try {
            const { id, email } = req.body;

            const user = await User.findOne({ where: { email } })

            if (!user) {
                user = await User.create({ email: email, role: 'ADMIN', password: 'googleAuth', googleId: String(id) })
            }

            const token = generateJwt(user.id, user.email, 'ADMIN');
            return res.json({ token });
        } catch (error) {
            console.error('Ошибка при обработке запроса Google Auth:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})

// getAll
apiRouter.get("/", async (req, res) => {
    let users = await User.findAll()
    return res.json(users);
})

// getOne
apiRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    return res.json(user)
})

// update
apiRouter.put("/:id", authMiddleware, ownerMiddleware, async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    user.name = name;

    await user.save();

    return res.json({ user });
});

// delete
apiRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    let user = await User.destroy({ where: { id } });
    return res.json({ id });
});

module.exports = apiRouter;