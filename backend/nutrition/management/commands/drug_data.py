# management/commands/import_drug_data.py
import csv
from django.core.management.base import BaseCommand
from nutrition.models import DrugCategory, Drug
from io import StringIO

class Command(BaseCommand):
    help = 'Import drug data from CSV'
    
    def handle(self, *args, **options):
        csv_data = """Drug Category	Drug	Drug Effect	Nutritional Implications and Cautions
Antiinfective Drugs Antibacterial Agents: Penicillins		"Short-term use: diarrhea
Long-term use: oral candidiasis, diarrhea, epigastric distress, Clostridium difficile."	Use caution with low potassium diets or in patients with renal failure.
	amoxicillin/clavulanic acid (Augmentin)	"Short-term use: diarrhea
Long-term use: oral candidiasis, diarrhea, epigastric distress, Clostridium difficile."	"Use caution with low potassium diets or in patients with renal failure. take with food to ↓ GI distress.
Replace fluids & electrolytes for diarrhea.
Probiotic is advised."
	Penicillin VK (Pen VK)	"Short-term use: diarrhea
Long-term use: oral candidiasis, diarrhea, epigastric distress, Clostridium difficile.Pen VK 250 mg tab contains 0.73 mEq of potassium
Pen VK 500 mg tab contains 1.44 mEq potassium
Pen VK Suspension 125 mg/5 mL = 0.42 mEq potassium
Pen VK Suspension 250 mg/5 mL = 0.85 mEq potassium"	Use caution with low potassium diets or in patients with renal failure.
	Piperacillin/Tazobactam (Zosyn)	"Short-term use: diarrhea
Long-term use: oral candidiasis, diarrhea, epigastric distress, Clostridium difficile.Zosyn 2.25 g = 125 mg Na
Zosyn 3.375 g = 192 mg Na
Zosyn 4.5 g = 256 mg Na"	Use caution with low potassium diets or in patients with renal failure.
Antiinfective Drugs Antibacterial Agents: Macrolides	azithromycin (Zithromax)	"May cause GI distress (are promotility agents: erythromycin >> clarithromycin >> azithromycin), anorexia, stomatitis, dysgeusia, or diarrhea.
May increase sedative effect of alcohol.
May cause Clostridium difficile."	Take with food to ↓ GI distress; eat frequent, small, appealing meals  to counteract anorexia; use mouth rinses, mint, or lemon water for dysgeusia; replace fluids & electrolytes for diarrhea; avoid alcohol. probiotic is advised.
	clarithromycin (Biaxin)		
	erythromycin (Ery-Tab)	"May cause GI distress (are promotility agents: erythromycin > clarithromycin > azithromycin), anorexia, stomatitis, dysgeusia, or diarrhea.
May increase sedative effect of alcohol.
May cause Clostridium difficile.Grapefruit may increase erythromycin levels leading to cardiac conduction abnormalities."	
Antiinfective Drugs Antibacterial Agents: Sulfonamide Combination	sulfamethoxazole/trimethoprim (Bactrim)	May interfere with folate metabolism, especially with long-term use. May cause stomatitis, anorexia, nausea and vomiting, severe allergic reactions. May inhibit aldehyde dehydrogenase or the elimination of acetaldehyde resulting in disulfiram-type reaction. May increase potassium levels (generally at high doses) and hypoglycemia (more common in the elderly). May cause Clostridium difficile.	Take with food and 8 oz fluid to ↓ nausea, vomiting, and anorexia. Replace fluids & electrolytes for diarrhea. Supplement folic acid as needed. Discontinue and consult physician at first sign of allergic reaction. Avoid alcohol. Use with caution in patients with potassium supplements or in renal failure. May potentiate hypoglycemia in diabetic patients. Probiotic is advised.
Antiinfective Drugs Antibacterial Agents: Cephalosporins	Cephalosporins First Generation: cephalexin (Keflex)	May cause stomatitis, sore mouth and tongue, and may interfere with eating. May cause diarrhea and Clostridium difficile. 	Replace fluids & electrolytes for diarrhea. Eat moist, soft, low-salt foods and cold foods such as ice chips, sherbet, and yogurt for stomatitis and sore mouth. Probiotic is advised. Take with a meal for optimal bioavailability. 
	Cephalosporins First Generation: cefazolin (Ancef)		
	Cephalosporins Second Generation: cefprozil (Cefzil)	May cause stomatitis, sore mouth and tongue, and may interfere with eating. May cause diarrhea and Clostridium difficile. 	Replace fluids & electrolytes for diarrhea. Eat moist, soft, low-salt foods and cold foods such as ice chips, sherbet, and yogurt for stomatitis and sore mouth. Probiotic is advised. Take with a meal for optimal bioavailability. 
	Cephalosporins Second Generation: cefuroxime (Ceftin)	May cause stomatitis, sore mouth and tongue, and may interfere with eating. May cause diarrhea and Clostridium difficile. Food ↑ bioavailability of tablets and suspension (cefuroxime). Antacids (H2 blockers and PPIs), may ↓ bioavailability, avoid combination. Some cefuroxime products contain phenylalanine.	Replace fluids & electrolytes for diarrhea. Eat moist, soft, low-salt foods and cold foods such as ice chips, sherbet, and yogurt for stomatitis and sore mouth. Probiotic is advised. Take with a meal for optimal bioavailability. Take separately from H2 blockers or proton pump inhibitors or avoid combination (cefuroxime). Probiotic may be advised. 
	Cephalosporins Third Generation: ceftriaxone (Rocephin)	May cause stomatitis, sore mouth and tongue, and may interfere with eating. May cause diarrhea and Clostridium difficile. 	Replace fluids & electrolytes for diarrhea. Eat moist, soft, low-salt foods and cold foods such as ice chips, sherbet, and yogurt for stomatitis and sore mouth. Probiotic is advised. 
	Cephalosporins Third Generation: Ceftazidime (Fortaz)	May cause stomatitis, sore mouth and tongue, and may interfere with eating. May cause diarrhea and Clostridium difficile.	Replace fluids & electrolytes for diarrhea. Eat moist, soft, low-salt foods and cold foods such as ice chips, sherbet, and yogurt for stomatitis and sore mouth. Probiotic is advised.  
	Cephalosporins Third Generation: cefdinir (Omnicef)	May cause stomatitis, sore mouth and tongue, and may interfere with eating. May cause diarrhea and Clostridium difficile.	Replace fluids & electrolytes for diarrhea. Eat moist, soft, low-salt foods and cold foods such as ice chips, sherbet, and yogurt for stomatitis and sore mouth. Probiotic is advised. 
	Cephalosporins Third Generation: cefpodoxime (Vantin)		Replace fluids & electrolytes for diarrhea. Eat moist, soft, low-salt foods and cold foods such as ice chips, sherbet, and yogurt for stomatitis and sore mouth. Probiotic is advised.Take  with food. 
	Cephalosporins Fourth Generation: cefepime (Maxipime)		Replace fluids & electrolytes for diarrhea. Eat moist, soft, low-salt foods and cold foods such as ice chips, sherbet, and yogurt for stomatitis and sore mouth. Probiotic is advised. 
Antiinfective Drugs Antibacterial Agents: Fluoroquinolones	ciprofloxacin (Cipro)	Drug will bind to magnesium, calcium, zinc, and iron, forming an insoluble, unabsorbable complex. May cause Clostridium difficile. Inhibits metabolism of caffeine and can therefore ↑ CNS stimulation. Drug may rarely precipitate in renal tubules.	Limit caffeine intake. Take 2 hours before or 6 hours after antacids, Mg, Ca, Fe, Zn supplements, or multivitamin with minerals. Replace fluids & electrolytes for diarrhea. Hold tube feeds 1–2 hours before and 1–2 hours after drug. Probiotic is advised. Take drug with 8 oz of fluid and maintain adequate hydration.
	levofloxacin (Levaquin)	Drug will bind to magnesium, calcium, zinc, and iron, forming an insoluble, unabsorbable complex. May cause Clostridium difficile. 	Take 2 hours before or 6 hours after antacids, Mg, Ca, Fe, Zn supplements, or multivitamin with minerals. Replace fluids & electrolytes for diarrhea. Hold tube feeds 1–2 hours before and 1–2 hours after drug. Probiotic is advised. Take drug with 8 oz of fluid and maintain adequate hydration.
	moxifloxacin (Avelox)		
Antimicrobial Agents: Oxazolidinone	linezolid (Zyvox)	Drug exhibits mild MAO inhibition. May cause taste change, oral candidiasis, and Clostridium difficile.	Avoid significant amounts (>100 mg) of high tyramine/pressor foods. Eat small, frequent, appealing meals if taste changes. Replace fluids & electrolytes for diarrhea. Probiotic is advised.
Antimicrobial Agents: Tetracyclines	tetracycline (Sumycin)	Often used to treat Lyme disease; may cause anorexia. Binds to Mg, Ca, Zn, and Fe, forming an insoluble unabsorbable complex. May ↓ bacterial production of vitamin K in GI tract. Long-term use may cause B vitamin deficiencies. Combining with vitamin A may ↑ risk of benign intracranial hypertension. May cause Clostridium difficile.	Take supplements separately by 3 hours. Eat frequent, small, appealing meals to ↓ anorexia. Avoid excessive vitamin A while taking drug. Long-term use may warrant vitamins K and B supplementation. Probiotic is advised. Replace fluids & electrolytes for diarrhea. Take drug 1 hour before or 2 hours after food or milk. Can cause pill esophagitis, take with a full glass of water.
	doxycycline (Vibramycin)	Often used to treat Lyme disease; may cause anorexia. Binds to Mg, Ca, Zn, and Fe, forming an insoluble unabsorbable complex. May ↓ bacterial production of vitamin K in GI tract. Long-term use may cause B vitamin deficiencies. Combining with vitamin A may ↑ risk of benign intracranial hypertension. May cause Clostridium difficile.	Take supplements separately by 3 hours. Eat frequent, small, appealing meals to ↓ anorexia. Avoid excessive vitamin A while taking drug. Long-term use may warrant vitamins K and B supplementation. Probiotic is advised. Replace fluids & electrolytes for diarrhea. 
Antimicrobial Agents: Antiprotozal/Antibacterial	metronidazole (Flagyl)	May cause anorexia, GI distress, stomatitis, and metallic taste in mouth. May cause disulfiram-like reaction when ingested with alcohol. Often used to treat Clostridium difficile.	Take with food to ↓ GI distress. Eat small, frequent, appealing meals to decrease anorexia. Avoid all alcohol during use and for 3 days after discontinuation. Probiotic is advised.
	clindamycin (Cleocin)	May cause weight loss, increased thirst, esophagitis, nausea, vomiting, cramps, flatulence, bloating, or diarrhea. May cause severe Clostridium difficile.	Take oral forms with food or 8 oz water to decrease esophageal irritation. Replace fluids & electrolytes for diarrhea. Probiotic is advised.
Antimicrobial Agents: Nitrofuran	nitrofurantoin (Macrobid)	Peripheral neuropathy, muscle weakness, and wasting may occur with preexisting anemia, vitamin B deficiency, or electrolyte abnormalities. May cause Clostridium difficile.	Drug should be taken with food to maximize absorption, protein, and vitamin B complex. Avoid in G-6-PD deficiency due to risk of hemolytic anemia. Replace fluids & electrolytes for diarrhea. Probiotic is advised.
Antimicrobial Agents: Antituberculars	isoniazid (Nydrazid)	Drug may cause pyridoxine (vitamin B6) and niacin (vitamin B3) deficiency resulting in peripheral neuropathy and pellagra. Drug has MAO inhibitor–like activity.	Avoid in malnourished individuals and others at ↑ risk for peripheral neuropathy. Supplement with 25–50 mg of pyridoxine and possibly B-complex if skin changes occur. Avoid foods high in tyramine (e.g., aged cheeses).
	rifampin (Rifadin)	Drug may increase metabolism of vitamin D. Rare cases of osteomalacia have been reported. Food decreases absorption by 30%.  	May need vitamin D supplement with long-term use. Take on an empty stomach.
	rifabutin	Drug may increase metabolism of vitamin D. Rare cases of osteomalacia have been reported. Food decreases absorption by 30%. Less potent enzyme inducer than rifampin with less effects on vitamin D metabolism.	May need vitamin D supplement with long-term use. Take on an empty stomach.
	ethambutol (Myambutol)	Drug may ↓ the excretion of uric acid, leading to hyperuricemia and gout. Myambutol: may g copper and zinc.	Maintain adequate hydration and purine-restricted diet.  ↑ foods high in Cu and Zn; daily multivitamin with long-term use.
	pyrazinamide (Rifater)	Drug may ↓ the excretion of uric acid, leading to hyperuricemia and gout.	Maintain adequate hydration and purine-restricted diet.
Antifungal Agents 	amphotericin B (Fungizone)	Drug may cause anorexia and weight loss. Drug causes loss of potassium, magnesium, and calcium. Nephrotoxic.	Eat frequent, small, appealing meals high in magnesium, potassium, and calcium. May require PO/IV supplementation. Ensure adequate IV hydration pre and post infusion to reduce renal injury.
	ketoconazole (Nizoral)	Drug does not dissolve at pH >5 (Ketoconazole)	Take with food to ↑ absorption. Take with acidic liquid (e.g., orange juice), especially individuals with achlorhydria or those on H2 blockers or PPIs.
	fluconazole (Diflucan)		
	posaconazole (Noxafil)		Posaconazole tablets (delayed release): Take with a full meal, preferably high-fat (≥50g). Suspension: Give during or within 20 minutes following a full meal, liquid nutritional supplement, or an acidic carbonated beverage (e.g., ginger ale). 
	 voriconazole (Vfend)		Food decreases voriconazole absorption. Oral voriconazole should be taken 1 hour before or 2 hours after a meal.
	terbinafine (Lamisil)	Drug may cause taste changes or loss, dyspepsia, abdominal pain, diarrhea, weight loss, and headaches. May result in increased adverse effects of caffeine (headache, agitation, insomnia, diuresis).	Avoid taking with acidic foods such as applesauce or fruit-based foods. Limit alcohol and caffeine.
Selected Antiviral Agents 	valganciclovir (Valcyte)	Cytomegalovirus antiviral agent. Suppresses bone marrow, renally eliminated.	Must take with a high-fat meal to maximize absorption.
Selected Antithrombotic/Hematologic Drugs Anticoagulant: Vitamin K Antagonist	warfarin (Coumadin)	Prevents the conversion of oxidized vitamin K to the active form. Produces systemic anticoagulation. May inhibit mineralization of newly formed bone.	Consistent intake of vitamin K-containing foods and supplements is required, not complete avoidance in order to achieve desired state of anticoagulation. Monitor bone mineral density in individuals on long-term therapy. Data are conflicting on whether consumption of cranberry and pomegranate juice/fruit with warfarin causes increased INR and bleeding episodes. However, it may be prudent to advise patients to avoid drinking large quantities of cranberry juice with warfarin. When concurrent consumption does occur, frequent monitoring for INR changes and for signs or symptoms of bleeding is recommended. The quantity of green and black tea consumed and the method of production affect the amount of vitamin K in the tea. Use caution when enteral nutrition is used in patients receiving warfarin, as there have been reports of development of warfarin resistance in patients receiving concurrent enteral feeding, even when using low vitamin K-containing products. Celery may potentiate the effect of anticoagulants. Apigenin, a constituent of celery, may inhibit thromboxane A2 formation leading to reduced platelet aggregation (Teng et al, 1988). Celery contains coumarin derivatives, which may produce additional anticoagulant effects. Avoid high doses of fish oil, vitamin E, and herbal products with antiplatelet or anticoagulant effects.
Selected Antithrombotic/Hematologic Drugs Anticoagulant: Direct thrombin inhibitor	dabigatran (Pradaxa)	Drug may cause dyspepsia, abdominal pain, GERD, esophagitis, erosive gastritis, diarrhea, gastric hemorrhage, or GI ulcer. Alcohol may potentiate the effect, increasing the risk of bleeding.	Avoid alcohol and supplements, SJW can ↓ drug effectiveness. Avoid grapefruit, can increase dabigatran concentrations. Chewing can ↓ bioavailability by 75%. Take with food if GI distress occurs.
Selected Antithrombotic/Hematologic Drugs Anticoagulant: Factor Xa inhibitors	rivaroxaban (Xarelto)	Drug may cause abdominal pain, oropharyngeal pain, toothaches, dyspepsia, and anemia. Excess alcohol can ↑ bleeding risk.	Avoid high doses of fish oil, vitamin E, and herbal products with antiplatelet or anticoagulant effects. Avoid SJW because it can lead to decreased effectiveness. Avoid grapefruit/related citrus (limes, pomelo, Seville oranges) because they can increase risk of bleeding. Minimize alcohol intake.
	apixaban (Eliquis)		
	edoxaban (Savaysa)		
	betrixaban (Bevyxxa)		
Antiplatelet Agents: Platelet aggregation inhibitors	aspirin/salicylate (Bayer)	Drug may cause GI irritation and bleeding. Drug may ↓ uptake of vitamin C and ↑ urinary loss.	"Incorporate foods high in vitamin C and folate. Monitor electrolytes and hemoglobin to determine need for potassium or iron supplements.
Avoid alcohol consumption."
	clopidogrel (Plavix)	Drug may cause dyspepsia, nausea and vomiting, abdominal pain, GI bleeding/hemorrhage, diarrhea, and constipation.	"Food ↑ bioavailability. Take with food if GI distress occurs.
Avoid grapefruit/related citrus (limes, pomelo, Seville oranges).
Replace fluids and electrolytes for diarrhea."
	prasugrel (Effient)		
	ticagrelor (Brilinta)		
Selected Antihyperglycemic Drugs Insulin Sensitizing Agents: Biguanide	metformin (Glucophage)	Drug may ↓ absorption of vitamin B12 and folic acid. May cause lactic acidosis. Drug does not cause hypoglycemia.	Follow American Diabetes Association dietary guidelines. ↑ Foods high in vitamin B12 and folate; supplement if necessary. Avoid alcohol to ↓ risk of lactic acidosis.
Selected Antihyperglycemic Drugs Insulin Sensitizing Agents: Thiazolidinedione (TZD)	rosiglitazone (Avandia)	Drugs may lead to ↑ weight and insulin sensitivity, and ↓ gluconeogenesis. may ↑ total cholesterol, LDL, triglycerides, and ↓ HDL. Rarely, drugs may cause hypoglycemia.	Black box warning: These agents cause or exacerbate congestive heart failure. Follow  American Diabetes Association dietary guidelines. Reduce calorie intake if weight loss is the goal.  Avoid SJW. Monitor blood lipid levels closely and encourage antiinflammatory diet to manage undesirable fluctuations.
	pioglitazone (Actos)	Drugs may lead to ↑ weight and insulin sensitivity, and ↓ gluconeogenesis.  May g total cholesterol, LDL, triglycerides and ↑ HDL.  Rarely, drugs may cause hypoglycemia.	
Insulin-Stimulating Agents - Sulfonylureas	glipizide (Glucotrol)	Drug may cause ↑ or ↓ in appetite, weight gain, dyspepsia, nausea, diarrhea, or constipation. Drugs may lead to hypoglycemia. Food can decrease absorption. May enhance the effect of alcohol.	Follow American Diabetes Association dietary guidelines, and encourage regular exercise. Time food intake according to pharmaceutical recommendations. Avoid alcohol. Take 30 min before meal to avoid erratic absorption.
	glyburide (DiaBeta)		
	glimepiride (Amaryl)		
Insulin-Stimulating Agents- Meglitinides	repaglinide (Prandin)	Drug stimulates the release of insulin and may lead to weight gain. May also cause nausea, vomiting, diarrhea, or constipation. Drug may cause hypoglycemia if meal not ingested.	Follow American Diabetes Association dietary guidelines and encourage exercise. Reduce calories if weight loss is the goal. Take 30 min before meal ingestion, dose should be skipped for that meal if not eating. Limit alcohol intake.
Enzyme Inhibitor Agents: Alpha-glucosidase inhibitors	miglitol (Glyset)	Drugs may delay the absorption of dietary disaccharides and complex carbohydrates. May also cause abdominal pain, diarrhea, and gas.  May reduce iron absorption. 	Follow American Diabetes Association dietary guidelines. Avoid digestive enzymes and limit alcohol.  Monitor iron levels and supplement as needed.
	acarbose (Precose)	Drugs may delay the absorption of dietary disaccharides and complex carbohydrates. May also cause abdominal pain, diarrhea, and gas. do not cause hypoglycemia.	Follow American Diabetes Association dietary guidelines. Avoid digestive enzymes and limit alcohol.  Monitor liver enzymes (AST, ALT) quarterly during the first year.
Enzyme Inhibitor Agents: Dipeptidyl peptidase-4 (DPP-4) inhibitors (Gliptins)	sitagliptin (Januvia)	Drugs may lead to weight gain, abdominal pain, constipation, diarrhea, gastroenteritis, nausea, vomiting, and rarely, pancreatitis. Drug may cause hypoglycemia.	Follow American Diabetes Association dietary guidelines. ↓ Calories if weight loss is the goal.  reports of pancreatitis
	saxagliptin (Onglyza)		 Follow American Diabetes Association dietary guidelines. ↓ Calories if weight loss is the goal.  Avoid grapefruit/related citrus (limes, pomelo, Seville oranges).  Avoid SJW.
	linagliptin (Tradjenta)		Follow American Diabetes Association dietary guidelines. ↓ Calories if weight loss is the goal. Avoid SJW.
	alogliptin (Nesina)		Follow American Diabetes Association dietary guidelines. ↓ Calories if weight loss is the goal.  reports of hepatotoxicity
Glucose Reabsorption Inhibitor Agents: SGLT-2 Inhibitors (Gliflozins) 	canagliflozin (Invokana)	Drugs ↓ reabsorption of glucose and ↑ urinary glucose excretion. Drugs may lead to weight loss, polydipsia, ↑ LDL, hypovolemia, and dehydration.  may cause hypoglycemia.	Follow American Diabetes Association dietary guidelines. Reduce calorie intake if weight loss is the goal. Monitor LDL and encourage appropriate fat intake. Avoid SJW.
	dapagliflozin (Farxiga)		Follow American Diabetes Association dietary guidelines. Reduce calorie intake if weight loss is the goal. Monitor LDL and encourage appropriate fat intake. 
	empagliflozin (Jardiance)		
	ertugliflozin (Steglatro)		
Selected Steroidal/Hormonal Drugs Corticosteroids	prednisone (Deltasone)	Drug induces protein catabolism, resulting in muscle wasting, atrophy of bone protein matrix, and delayed wound healing. Drug ↓ intestinal absorption of calcium; ↑ urinary loss of calcium, potassium, zinc, vitamin C, and nitrogen; causes sodium retention.	Maintain diet high in Ca, vitamin D, protein, K+, Zn, and vitamin C, and low in sodium. Ca and vitamin D supplements recommended to prevent osteoporosis with long-term use of drug.
	methylprednisolone (Medrol)		
	dexamethasone (Decadron)		
Bisphosphonates	alendronate (Fosamax)	Drug may induce mild ↓ in serum calcium. Long-term use may cause zinc deficiency.	Pair with diet high in Ca or use Ca/vitamin D supplement. Monitor for signs of zinc deficiency. Drug must be taken 30 minutes to 1 hour before first intake of day with plain water only. Can cause pill-esophagitis; remain upright for 30 minutes after ingesting. Take zinc supplements 2 hours away from drug.
	ibandronate (Boniva)		
	risedronate (Actonel)		
	zoledronic acid (Reclast)	Drug may induce mild ↑ in serum calcium. Long-term use may cause zinc deficiency.	Pair with diet high in Ca or use Ca/vitamin D supplement. Monitor for signs of zinc deficiency. Drug must be taken 30 minutes to 1 hour before first intake of day with plain water only. Can cause pill-esophagitis; remain upright for 30 minutes after ingesting. Take zinc supplements 2 hours away from drug.
Female Hormones 	estrogen (Premarin)	Drug may ↓ absorption and tissue uptake of vitamin C but may ↑ absorption of vitamin A. May inhibit folate conjugate and decrease serum folic acid. Drug may ↓ serum vitamin B6, B12, riboflavin, magnesium, zinc.	Maintain diet with adequate Mg, folate, vitamin B6 and B12, riboflavin, and zinc. Calcium and vitamin D supplements may be advised with estrogen as hormone replacement for postmenopausal women.
	Oral contraceptives		
Thyroid Hormones	levothyroxine (Synthroid) 	"Drug may cause appetite changes, weight loss, and nausea/diarrhea.
Iron, calcium or magnesium may ↓ absorption of drug. Soy, walnuts, cottonseed oil, or high-fiber foods may also ↓ absorption."	"Take Fe, Ca, or Mg supplements away from drug by
≥4 hours; take drug 2-3 hours before soy. Eat walnuts, cottonseed oil, or high-fiber foods away from medication. Use caution with grapefruit/related citrus (limes, pomelo, Seville oranges). Enteral nutrition may reduce bioavailability leading to hypothyroidism. Take on an empty stomach 30 minutes before a meal or 3-4 hours after last meal of the day."
	liothyronine (Cytomel) 		
"Selected Cardiovascular Drugs
Cardiac Glycoside Agent"	digoxin (Lanoxin) 	Drug may ↑ urinary loss of magnesium and ↓ serum levels of potassium.	Monitor potassium and magnesium levels and use caution with calcium supplements and antacids. Take on an empty stomach and avoid high amounts of bran as this may decrease absorption. 
Beta Blocking Agents	metoprolol (Lopressor, Toprol XL)	"Do not stop taking abruptly unless under the close monitoring of the physician, can lead to rebound hypertension and cardiac ischemia.
Drugs may mask signs of or prolong hypoglycemia. Drug may ↓ insulin release in response to hyper- glycemia."	"Monitoring of blood glucose levels for hypoglycemia or hyperglycemia may be recommended upon initiation of drugs.
Take with food."
	atenolol (Tenormin)		
	 bisoprolol (Blocadren)		
	nadolol (Corgard)		
	propranolol (Inderal)		
	carvedilol (Coreg)	May cause weight gain, nausea, vomiting, and diarrhea. May mask symptoms of diabetic hyperglycemia.	Avoid natural licorice and encourage low sodium diet. ↓ calories if weight loss is the goal. Patients with diabetes should monitor glucose regulary. Take with food to prevent orthostatic hypotension.
ACE Inhibitor Agents	enalapril (Vasotec)	Drugs may ↑ serum potassium. Drugs may cause abdominal pain, constipation, or diarrhea.	Caution with high-potassium diet or supplements. Avoid salt substitutes. Ensure adequate fluid intake. Avoid natural licorice. Limit alcohol.
	lisinopril (Zestril)		
	benazepril (Lotensin)		
	ramipril (Altace)		
Angiotensin II Receptor Antagonists	losartan (Cozaar)	Drugs may ↑ serum potassium.	Caution with high-potassium diet or supplements. Ensure adequate hydration. Avoid natural licorice and salt substitutes. Avoid grapefruit/related citrus (limes, pomelo, Seville oranges).
	valsartan (Diovan)		Caution with high-potassium diet or supplements. Ensure adequate hydration. Avoid natural licorice and salt substitutes.
	irbesartan (Avapro)		
	telmisartan (Micardis)		
Calcium Channel Blocking Agents	amlodipine (Norvasc)	Drug may cause dysphagia, nausea, cramps, and edema.	If GI distress occurs, take with food. Avoid natural licorice. Reduce sodium intake. Grapefruit can modestly increase amlodipine levels; use caution with combination or avoid altogether.
	diltiazem (Cardizem)	Drug may cause anorexia, dry mouth, dyspepsia, nausea, vomiting, constipation, and diarrhea.	Avoid natural licorice. Strict adherence to a low-sodium diet may ↓ antihypertensive effect. Grapefruit can increase diltiazem levels; avoid grapefruit.
Alpha Adrenergic Agonist 	clonidine (Catapres)	Drug commonly causes dizziness, drowsiness, and sedation.	Avoid alcohol and alcohol products. Drug ↑ sensitivity to alcohol, which may ↑ sedation caused by drug alone.
Peripheral Vasodilator	 hydralazine (Apresoline)	Drug interferes with pyridoxine (vitamin B6) metabolism and may result in pyridoxine deficiency. Food and enteral nutrition decrease bioavailability.	Maintain a diet high in pyridoxine. Supplementation may be necessary. Enteral nutrition should be stopped prior to administration or take on an empty stomach.
Antiarrhythmic Agent	amiodarone (Pacerone)	"Drug may cause anorexia, nausea, vomiting, taste changes, or increases in liver enzymes or thyroid
hormones."	"Avoid grapefruit/related citrus (limes, pomelo, Seville
oranges) and SJW. Monitor hepatic and thyroid function. Contains 3 mg of inorganic iodide per 100 mg of amiodarone."
"Selected Antihyperlipidemic Drugs
HMG Co-A Reductase Inhibitors"	atorvastatin (Lipitor)	Drug may cause significant reduction in CoQ10. Drug lowers LDL cholesterol, raises HDL cholesterol	"Supplementation with CoQ10 has not been shown to ↓ statin myopathy but may still be advisable for repletion of the nutrient. Encourage antiinflammatory diet for optimal drug effect. Avoid grapefruit/related citrus (limes, pomelo, Seville oranges).
Concurrent use of red yeast rice may increase risk of side effects."
	simvastatin (Zocor)		
	pravastatin (Pravachol)		"Supplementation with CoQ10 has not been shown to ↓ statin myopathy but may still be advisable for repletion of the nutrient. Encourage antiinflammatory diet for optimal drug effect. 
Concurrent use of red yeast rice may increase risk of side effects."
	rosuvastatin (Crestor)		
Fibric Acid Derivative	gemfibrozil (Lopid)	Drug decreases serum triglycerides.Taste changes may occur.	Encourage antiinflammatory diet for optimal drug effect. Avoid alcohol. Small meals are recommended.
	 fenofibrate (Tricor)	Drug decreases serum triglycerides. 	Encourage antiinflammatory diet for optimal drug effect. Avoid alcohol. 
Bile Acid Sequestrant	cholestyramine (Questran)	Drug binds fat-soluble vitamins (A, E, D, K), β-carotene, calcium, magnesium, iron, zinc, and folic acid.	Take fat-soluble vitamins in water-miscible form or take vitamin supplement at least 1 hour before first dose of drug daily. Maintain diet high in folate, Mg, Ca, Fe, Zn or supplement as needed. Monitor serum nutrient levels for long-term use.
Nicotinic Acid	niacin (Niaspan)	High dose may elevate blood glucose and uric acid.	Low-purine diet as recommended. Monitor blood glucose with diabetes.
Selected Diuretic Drugs Loop Diuretics	furosemide (Lasix)	Drug ↑ urinary excretion of sodium, potassium, magnesium, and calcium. Long-term use can lead to ↑ urinary zinc excretion.	Maintain diet high in zinc, potassium, magnesium, and cal- cium. Avoid natural licorice, which may counteract diuretic effect of drug. Monitor electrolytes; supplement as needed.
	bumetanide (Bumex)		
Thiazide Diuretic	hydrochlorothiazide (Hydrodiuril)	Drug ↑ urinary excretion of sodium, potassium, magnesium and ↑ renal resorption of calcium. Long-term use can lead to ↑ urinary zinc excretion.	Maintain diet high in zinc, potassium, and magnesium. Avoid natural licorice, which may counteract diuretic effect of drug. Monitor electrolytes and supplement as needed. Use caution with Ca supplements.
	 chlorothiazide (Diuril)		
	 chlorthalidone (Hygroton)		
	metolazone (Zaroxyln)		
Potassium-Sparing Diuretics	triamterene (Dyrenium)	Drug ↑ renal resorption of potassium. Long-term use can lead to ↑ urinary zinc excretion.	Avoid salt substitutes. Use caution with potassium supplements. Avoid excessive potassium intake in diet. Monitor for signs of zinc deficiency.
	spironolactone (Aldactone)		
"Selected Analgesic Drugs
Non-Narcotic Analgesics"	acetaminophen (Tylenol)	Drug may cause hepatotoxicity at high dose. Chronic alcohol ingestion ↑ risk of hepatotoxicity.	Maximum safe adult dose is ≤3 g/day. Avoid alcohol or limit to ≤2 drinks/day.
Non-Steroidal Antiinflammatory Drugs (NSAIDs)	ibuprofen (Motrin)	"Standard warning with NSAIDs:
GI: ↑ risk of serious GI events (bleeding, ulceration, perforation of stomach and intestines) can occur at any time during use without warning. Elderly taking corticosteroids, antiplatelets, or anticoagulants are at greater risk.
Renal: ↑ Risk of kidney injury.
Cardiovascular: ↑ risk of serious cardiovascular thrombotic events, myocardial infarction, and stroke."	"Take drug with food or milk to decrease risk of GI toxicity. Avoid use in the elderly or in individuals with severe cardiovascular disease or renal disease.
For chronic ongoing use, consider adding PPI to decrease risk of gastric ulceration."
	naproxen (Naprosyn)		
	meloxicam (Mobic)		
	ketorolac (Toradol)		
COX-2 Inhibitor	celecoxib (Celebrex)	"Drug may cause GI distress, weight gain, taste changes, dyspepsia, nausea, abdominal pain,
diarrhea, and flatulence. Rare sudden, serious GI bleeding and colitis can occur."	If GI distress occurs, take with food and limit caffeine. High-fat meals delay concentration but ↑ absorption. Same cardiovascular risks as NSAIDs.
Narcotic Analgesic Agents (Opioids)	"morphine (MS Contin)
"	"Narcotics can be highly addictive and may cause severe dose-related sedation, respiratory depression, dry mouth, and constipation.
Drugs cause slowing of digestion."	"Monitor respiratory function and bowel function (not with paralytic ileus).
Do not crush or chew sustained-release. 
Do not take with alcohol or other CNS depressants."
	codeine/apap (Tylenol #3)		
	hydrocodone/apap (Norco)		
	oxycodone (OxyContin)		"Monitor respiratory function and bowel function (not with paralytic ileus).
Do not crush or chew sustained-release. . Do not take with alcohol or other CNS depressants. Caution with grapefruit/related citrus (limes, pomelo, Seville oranges); do not take with SJW."
	hydromorphone (Dilaudid)		"Monitor respiratory function and bowel function (not with paralytic ileus).
Do not crush or chew sustained-release.  Do not take with alcohol or other CNS depressants."
	fentanyl (Duragesic)		"Monitor respiratory function and bowel function (not with paralytic ileus).
Do not crush or chew sustained-release. . Do not take with alcohol or other CNS depressants. Caution with grapefruit/related citrus (limes, pomelo, Seville oranges); do not take with SJW."
	methadone (Dolophine)		Monitor respiratory function and bowel function (not with paralytic ileus). Do not crush or chew sustained-release. Do not take with alcohol or other CNS depressants.
Synthetic Opioid Analgesic 	tramadol (Ultram) 	May cause anorexia, dry mouth, dyspepsia, nausea/vomiting, abdominal pain, constipation, diarrhea, gas.	Avoid alcohol. Use caution with SJW. Some products contain phenylalanine. Do not combine with alcohol.
"Selected Antidepressant Drugs
Selective Serotonin Reuptake Inhibitors (SSRIs)"	sertraline (Zoloft)	Drugs may ↑ weight, appetite, dry mouth, or anorexia. Many drug interactions with herbs and supplements may ↑ toxicity. SSRI have antiplatelet effects increasing the risk for intestinal bleeding.	"Avoid tryptophan, SJW. Additive effects may produce ad- verse effects or serotonin syndrome. Monitor weight trends as appropriate. Avoid alcohol. Black box warning: Antidepressants increased the risk compared with placebo of suicidal thinking and behavior (suicidality) in children, adolescents, and young adults (<24 year oldr) in short-term studies of MDD and other psychiatric disorders.
Avoid taking with herbal products that have antiplatelet effects.
Many drug interactions through CYP450 system, check interactions with all herbs and supplements."
	citalopram (Celexa)	Drugs may ↑ weight, appetite, dry mouth, or anorexia. Many drug interactions with herbs and supplements may ↑ toxicity. SSRI have antiplatelet effects increasing the risk for intestinal bleeding.	
	escitalopram (Lexapro)	Drugs may ↑ weight, appetite, dry mouth, or anorexia. Many drug interactions with herbs and supplements may ↑ toxicity. SSRI have antiplatelet effects increasing the risk for intestinal bleeding.	
	fluoxetine (Prozac)	Drugs may ↑ weight, appetite, dry mouth, or anorexia. Many drug interactions with herbs and supplements may ↑ toxicity. May cause weight loss; may g absorption of leucine. SSRI have antiplatelet effects increasing the risk for intestinal bleeding.	
	paroxetine (Paxil)	Drugs may ↑ weight, appetite, dry mouth, or anorexia. Many drug interactions with herbs and supplements may ↑ toxicity. SSRI have antiplatelet effects increasing the risk for intestinal bleeding.	
Serotonin Antagonist/Reuptake Inhibitor (SARI) & Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs)	trazodone (Desyrel) - SARI	Some herbal and natural products may ↑ toxicity. 	"Alcohol may increase the sedative and psychomotor impair- ment as well as increase the risk of hepatotoxicity with duloxetine and milnacipran.
Avoid tryptophan and SJW.
Additive effects may produce adverse effects or serotonin
syndrome.
Avoid herbs that have antiplatelet effects.
Many drug interactions through CYP450 system, check
interactions with all herbs and supplements."
	venlafaxine (Effexor XR) - SNRI 	Some herbal and natural products may ↑ toxicity.  have antiplatelet effects increasing the risk for intestinal bleeding.	
	desvenlafaxine (Pristiq) - SNRI 		
	duloxetine (Cymbalta)	Some herbal and natural products may ↑ toxicity. 	
	 milnacipran (Savella)	Some herbal and natural products may ↑ toxicity. 	
Tricyclic Antidepressants (TCAs)	amitriptyline (Elavil)	May cause ↑ appetite (especially for carbs/sweets) and weight gain. Causes dry mouth and constipation. High fiber may ↓ absorption.	Monitor caloric intake. Maintain consistent fiber. Avoid alcohol (↑ sedation).
	nortriptyline (Pamelor)		
	doxepin (Silenor)		
	imipramine (Tofranil)		
Noradrenergic/Specific Serotonic Antidepressants (NaSSA)	mirtazapine (Remeron)	"Some herbal and natural products may  ↑  toxicity. Drug can also be used as an appetite stimulant and may cause significant  ↑ in appetite/weight
gain. Dry mouth and constipation are common."	"Avoid tryptophan and SJW.
Additive effects may produce adverse effects or sero-
tonin syndrome. Avoid combining with alcohol and
cannabis.
Some products contain phenylalanine."
Norepinephrine/Dopamine Reuptake Inhibitor (NDRI)	bupropion (Wellbutrin SR, XL)	"Drug may cause anorexia, weight loss or gain, ↑ appetite, dry mouth, stomatitis, taste changes,
dysphagia, pharyngitis, nausea/vomiting, dyspep- sia, or GI distress. Lowers seizure threshold."	"Minimize or avoid alcohol (lowers seizure threshold). Take with food to decrease GI irritation.
Avoid mixing with SJW."
Monoamine Oxidase Inhibitors (MAOIs)	phenelzine (Nardil)	Drug may cause ↑ appetite (especially for carbohy- drates and sweets) and weight gain. Risk for severe reaction with dietary tyramine.	Avoid foods high in tyramine, dopamine, tyrosine, phenylalanine, tryptophan, and caffeine during drug use and for 2 weeks after discontinuation to prevent hypertensive crisis. Monitor caloric intake to avoid weight gain.
Mood Stabilizers	lithium (Lithobid)	"Sodium intake affects drug levels. May cause dry mouth, dehydration, and thirst, reflective of ↑
drug toxicity. Drug may cause GI irritation. Drug can cause nephrotoxicity."	Drink 2 to 3 L of fluid daily to avoid dehydration. Maintain consistent dietary sodium intake. Take with food to ↓ GI irritation. Limit caffeine.
"Selected Antipsychotic & Antianxiety/Hypnotic Drugs
Typical Antipsychotic Agent"	haloperidol (Haldol)	May cause ↑ appetite, weight gain or loss, constipation, or dry mouth. Risk for tardive dyskinesia.	Monitor weight and calorie count. Tardive dyskinesia may interfere with biting, chewing, and swallowing. Avoid alcohol.
Atypical Antipsychotic Agents	aripiprazole (Abilify)	Drugs may cause ↑ appetite and weight gain. May also cause ↑ blood sugar, Hgb A1C, or lipids/triglycerides, xerostomia, constipation.	Monitor weight, fasting blood sugar, Hgb A1C, and lipids/triglycerides. Do not use in elderly dementia patients; increased risk of cerebrovascular events and greater mortality.
	clozapine (Clozaril)		
	olanzapine (Zyprexa)		
	paliperidone (Invega)		
	quetiapine (Seroquel)		
	risperidone (Risperdal)		
	ziprasidone (Geodon)		
Antianxiety/Hypnotic Agents	lorazepam (Ativan)	Drugs may cause significant sedation. Benzodiazepine drugs are highly addictive.	Avoid concurrent ingestion of alcohol, which will produce CNS depression. Limit or avoid caffeine, which may de- crease the therapeutic effect of the drug. Use caution with drugs and herbal and natural products that cause CNS stimulation or sedation that can result in profound respiratory sedation, coma, and death. Avoid using in patients "65 years old.
	alprazolam (Xanax)		
	clonazepam (Klonopin)		
	diazepam (Valium)		
	temazepam (Restoril)		
	zolpidem (Ambien)		
"Selected Anticonvulsant Drugs
Carboxamides"	carbamazepine (Tegretol)	Drug may ↓ biotin, folic acid, and vitamin D levels. Long-term therapy (>6 months)  may cause loss of bone mineral density. May cause significant hyponatremia.	"Maintain diet high in folate and vitamin D. Calcium and vita- min D supplements may be necessary for long-term therapy.
Use caution with grapefruit/related citrus (limes, pomelo, Seville oranges). Star fruit or pomegranate may ↑ drug levels and lead to toxicity. Avoid alcohol."
Hydantion	phenytoin (Dilantin)	"Drug may ↓ serum folic acid, calcium, vitamin D, biotin, and thiamine.
Drug can cause gingival enlargement, altered taste, dysphagia, nausea, vomiting, and constipation. Alcohol intake decreases drug levels, increases
seizure potential, and increases CNS depression. Ca and Mg may ↓ absorption."	May be paired with daily folic acid supplement; monitor levels. Consider Ca, vitamin D and B vitamin supplements with long-term use. Ca, Mg, or antacids should be taken 2 hours away from drug. Holding tube feeds 2 hours be- fore & 2 hours after oral drug is recommended. If continu- ous tube feeds, switch to IV or may require doubling of the oral phenytoin dose. Avoid alcohol and SJW.
Barbiturate	phenobarbital (Luminal)	"Drug may induce rapid metabolism of vitamin D, leading to vitamin D and calcium deficiencies. May also ↑ the metabolism of vitamin K and ↓ serum folic acid and vitamin B12.
Alcohol increases CNS depression and could lead to respiratory depression."	"Encourage ↑ dietary intake of Ca, vitamin D, and folate. Consider Ca, vitamin D, folic acid, and vitamin B12 supplementation with long-term use.
Avoid alcohol."
Valproic Acid Derivatives	divalproex, valproic acid (Depakote)	Causes competitive inhibition of intestinal SLC22A transport protein, leading to malabsorption of dietary carnitine.	Can cause symptomatic carnitine deficiency in susceptible patients. Supplement as necessary.
Gamma-Amino Butyric Acid (GABA) Analogs	gabapentin (Neurontin)	"Drugs used for neuropathy, hot flashes, migraines, and as mood stabilizers.
Mg can interfere with drug efficacy by ↓ absorption.
Can cause ↑ weight and appetite, nausea, gingivitis, constipation, xerostomia, vomiting, and diarrhea."	Take Mg supplements separately by 2 hours. Avoid alcohol to prevent additive CNS depression.
	 pregabalin (Lyrica)		Administer with meals. Avoid alcohol to prevent additive CNS depression.
Fructose Derivative	topiramate (Topamax)	May cause weight loss, anorexia, dry mouth, gingivitis, taste changes, GERD, nausea, dyspepsia, constipation, or diarrhea.	Encourage adequate fluid intake to g risk of kidney stones. Replace fluids & electrolytes for diarrhea. Avoid alcohol.
	lamotrigine (Lamictal)		Avoid alcohol
"Selected Anti-Dementia Drugs
Cholinesterase Inhibitors"	donepezil (Aricept)	Drug is highly cholinergic; may cause weight loss, diarrhea, nausea/vomiting, ↑ gastric acid, and GI bleeding.	Take with food to prevent GI irritation. Monitor food intake and weight trends.
	rivastigmine (Exelon)		
NMDA Receptor Antagonist	memantine (Namenda)	Drug is cleared from the body almost exclusively by renal excretion. Urine pH >8 decreases renal excretion by 80%.	Avoid diet that alkalinizes the urine (predominantly milk products, citrus fruit) to avoid drug toxicity.
"Selected Gastrointestinal Drugs
H2 Receptor Antagonist"	ranitidine (Zantac)	May reduce the  absorption of B12 and iron.	Monitor vitamin  B12 level and iron studies on long-term therapy. Supplement as needed.
	famotidine (Pepcid)		
Proton Pump Inhibitors	omeprazole (Prilosec)	"Long-term ↓ acid secretion may inhibit the absorption of iron and vitamin B12;  ↓ calcium absorption may lead to osteoporosis. Low Mg may occur.
Inhibition of acid secretion may also ↑ the risk of Clostridium difficile. Some studies have also shown correlation between PPI therapy, SIBO, and IBS."	"Monitor iron studies, vitamin B12, magnesium levels, and bone density with long-term use; supplement as needed. Consider alternatives in those with a diagnosis of SIBO and/or IBS. Avoid SJW and ginkgo. Hold tube feeds 1 hour before and 1 hour after drug.
"
	lansoprazole (Prevacid)		"Monitor iron studies, vitamin B12, magnesium levels, and bone density with long-term use; supplement as needed. Consider alternatives in those with a diagnosis of SIBO and/or IBS. 
"
	esomeprazole (Nexium)		
	pantoprazole (Protonix)		
	dexlansoprazole (Dexilant)		
Prokinetic Agent	metoclopramide (Reglan)	"Drug ↑ gastric emptying; may change insulin requirements in persons with diabetes; may
↑ CNS depressant effects of alcohol. Drug may cause tardive dyskinesia with extended use."	Monitor blood glucose in persons with diabetes carefully when drug is initiated. Avoid alcohol. Tardive dyskinesia may interfere with biting, chewing, swallowing.
"Selected Antineoplastic Drugs
Folate Antagonist"	methotrexate (Trexall)	"Drug inhibits dihydrofolate reductase; decreased formation of active folate. Drug may cause
GI irritation or injury (stomatitis, gingivitis,
GI hemorrhage, intestinal perforation), diarrhea, nausea/vomiting, anorexia.
All antineoplastic drugs are cytotoxic; potential to damage intestinal mucosa.
Drug also used as an antirheumatic."	Maintain diet high in folate and vitamin B12. Daily folic acid supplement may be recommended with antirheumatic doses but is not advised with antineoplastic. Leucovorin rescue may be necessary with antineoplastic doses. Alcohol may increase the risk of hepatotoxicity; avoid alcohol.
Alkylating Agent	cyclophosphamide (Cytoxan)	"Drug metabolite causes bladder irritation, acute hemorrhagic cystitis.
All antineoplastic drugs are cytotoxic; potential to damage intestinal mucosa.
Decreases appetite."	Maintain high fluid intake (2-3 L daily) to induce frequent voiding.
Epidermal Growth Factor Inhibitor	erlotinib (Tarceva)	"Drug may cause anorexia, weight loss, stomatitis, nausea, vomiting, diarrhea. Rarely, GI bleeding
can occur."	Avoid SJW and grapefruit/related citrus (limes, pomelo, Seville oranges). Hold tube feeds 2 hour before and 1 hour after drug.
"Selected Anti-Parkinson’s Drugs
Dopamine Precursor"	carbidopa/levodopa (Sinemet)	Carbidopa protects levodopa against pyridoxine- enhanced peripheral decarboxylation to dopa- mine. Can cause xerostomia.	Pyridoxine supplements >10-25 mg daily may ↑ carbidopa requirements and ↑ adverse effects of levodopa. High protein diet (>2 g/kg) can decrease the efficacy of L-dopa.
Dopamine Agonist	bromocriptine (Parlodel)	Drug may cause GI irritation, nausea, vomiting, and GI bleeding.	Take with food to prevent GI irritation. Take at bedtime to ↓ nausea.
MAO-B Inhibitor	selegiline (Eldepryl)	Drug selectively inhibits MAO-B at 10 mg or less per day. Drug loses selectivity at higher doses.	Avoid high-tyramine foods at doses >10 mg/day. May precipitate hypertension.
COMT Inhibitor	entacapone (Comtan)	"Drug chelates iron, which for some patients may ↓ serum iron and make the drug less effective.
"	Monitor iron levels. Take iron supplement as needed 2–3 hours away from drug. Avoid alcohol.
"Selected Attention-Deficit/Hyperactivity Disorder (ADHD) Treatment Drugs
CNS Stimulants"	methylphenidate (Ritalin, Concerta)	Drugs may cause anorexia, weight loss, and ↓ growth in children. Dry mouth, metallic taste, and GI upset can occur. May be habit forming.	Monitor children’s weight/growth; ensure adequate calories. Limit caffeine & alcohol. Avoid SJW.
	"dextroamphetamine & amphetamine
(Adderall)"		Monitor children’s weight/growth; ensure adequate calories. Limit caffeine & alcohol. High-dose vitamin C and acidifying foods may ↓ absorption and ↑ excretion.
Selected Immunosuppressants	 tacrolimus (Prograf, Envarsus XR)	Inhibits calcineurin to suppress T-lymphocyte acti- vation. Can cause kidney injury, hyperglycemia, hyperkalemia, hypomagnesemia, hyperlipidemia. Also anorexia, constipation, diarrhea. CYP 3A4 substrate.	Monitor potassium; may need low K diet. Monitor Mg and replete as needed. Check fasting blood sugar and lipids at regular intervals. Avoid grapefruit and other herbs that can inhibit 3A4. avoid alcohol.
	 cyclosporine (Neoral, Sandimmune)		Monitor potassium; may need low K diet. Monitor Mg and replete as needed. Check fasting blood sugar and lipids at regular intervals. Avoid grapefruit and other herbs that can inhibit 3A4.
	 mycophenolate (Cellcept, Myfortic)	Inhibits inosine monophosphate dehydrogenase, preventing de novo guanosine nucleotide synthesis thereby inhibiting T and B cells. Causes nausea, diarrhea, constipation, vomiting, anorexia, and dyspepsia.	Take with food to decrease GI upset. Avoid taking Ca/Mg containing antacids within 2 hrs.
	sirolimus (Rapamune)	mTOR inhibitor that halts cell-cycle progression. Antiproliferative. Causes hypercholesterolemia, increased blood sugars, stomatitis, diarrhea, and constipation. Impairs wound healing.	Avoid grapefruit. Check lipids and blood sugars at regular intervals.
"""  # Paste your CSV data
        
        # Use StringIO to treat the string as a file
        csv_file = StringIO(csv_data)
        reader = csv.DictReader(csv_file, delimiter='\t')
        
        current_category = None
        
        for row in reader:
            # Check if this row has a category (first column has value)
            if row['Drug Category']:
                current_category_name = row['Drug Category'].strip()
                current_category, created = DrugCategory.objects.get_or_create(
                    name=current_category_name
                )
                if created:
                    self.stdout.write(f"Created category: {current_category_name}")
            
            # Only create drug if we have a category and drug name
            if current_category and row['Drug']:
                drug_name = row['Drug'].strip()
                drug_effect = row['Drug Effect'].strip() if row['Drug Effect'] else ''
                nutritional_implications = row['Nutritional Implications and Cautions'].strip() if row['Nutritional Implications and Cautions'] else ''
                
                drug, created = Drug.objects.get_or_create(
                    category=current_category,
                    name=drug_name,
                    defaults={
                        'drug_effect': drug_effect,
                        'nutritional_implications': nutritional_implications
                    }
                )
                
                if created:
                    self.stdout.write(f"Created drug: {drug_name}")
                else:
                    self.stdout.write(f"Drug already exists: {drug_name}")
        
        self.stdout.write(self.style.SUCCESS('Successfully imported drug data'))