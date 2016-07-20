var router = require('express').Router();

var list = [
	"Asthma",
	"Bipolar mood disease",
	"Brochiectasis",
	"Cardiac failure",
	"Cardiomyopathy",
	"Chronic obstructive pulmonary disease",
	"Chronic kidney disease",
	"Coronary artery disease",
	"Crohn's disease",
	"Diabetes insipidus",
	"Diabetes mellitus (type 1 and type 2)",
	"Dysrhythmia (irregular heartbeat)",
	"Epilepsy",
	"Glaucoma",
	"Haemophilia",
	"HIV",
	"Hyperlipidaemia (high cholesterol)",
	"Hypertension (high blood pressure)",
	"Hypothyroidism (inactive thyroid gland)",
	"Multiple sclerosis",
	"Parkinson's disease",
	"Rheumatoid arthritis",
	"Schizophrenia",
	"Systemic lupus erythematosis",
	"Ulcerative colitis"
];

/*  "/api/v1/chronicHealthProblems"
 *    GET: 
 */
router.get('/', function(req, res, next) {
	// JSON.parse(list);
    res.json(list);
});

module.exports = router;