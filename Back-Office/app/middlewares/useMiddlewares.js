// Middleware qui sert à récupérer l'utilisateur de la session et à l'envoyer à toutes les vues
module.exports = (request, response, next) => {
    // Si jamais j'ai la session qui existe et l'utilisateur est présent dans ma session alors je vais mettre cet utilisateur dans mes variables locals ( qui sont accessibles depuis mes vues )
    if (request.session) {
        response.locals.connected_member = request.session.member;
        
    }
    // Si j'ai pas ces variables, alors je vais créer cette variable connected_user mais la mettre à false
    else {
        response.locals.connected_member = false;
    }
    next();
};