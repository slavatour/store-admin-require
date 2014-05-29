var CategoriesRepository = require ("../repositories/CategoriesRepository");

exports.CategoriesController = function (conString) {
	var categoriesRepository = new CategoriesRepository.CategoriesRepository(conString);
	return categoriesRepository;
}