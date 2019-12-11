const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes').where({ id })
}

function findSteps(schemeId) {
    return db('schemes')
        .select("steps.id", "schemes.scheme_name", "steps.instructions", "steps.step_number")
        .join("steps", "steps.scheme_id", "schemes.id")
        .where("schemes.id", schemeId)
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}

function update(id, changes) {
    return db('schemes').where({ id }).update(changes)
}

function remove(id) {
    return db('schemes').where({ id }).del()
}

