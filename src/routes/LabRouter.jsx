<<<<<<< HEAD
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Core pages
const Dashboard = lazy(() => import("../components/Dashboard"));
const OhmsLaw = lazy(() => import("../components/Physics/Grade10/Ohmlaw"));

// Grade 9 - Physics
const Physics = lazy(() => import("../components/Physics/Grade9/Physics"));
const MeasurementUnits = lazy(() => import("../components/Physics/Grade9/Measurementunits"));
const Electricity = lazy(() => import("../components/Physics/Grade9/Electricity"));
const Friction = lazy(() => import("../components/Physics/Grade9/Friction"));
const HeatTemperature = lazy(() => import("../components/Physics/Grade9/HeatTemperature"));
const Magnetism = lazy(() => import("../components/Physics/Grade9/Magnetism"));
const MotionSpeed = lazy(() => import("../components/Physics/Grade9/MotionSpeed"));
const Newtons = lazy(() => import("../components/Physics/Grade9/Newtons"));
const Sound = lazy(() => import("../components/Physics/Grade9/Sound"));
const WEP = lazy(() => import("../components/Physics/Grade9/WEP"));

// Grade 9 - Chemistry
const Chemistry = lazy(() => import("../components/Chemistry/Grade9/Chemistry"));
const LabSafety = lazy(() => import("../components/Chemistry/Grade9/LabSafety"));
const AcidsBases = lazy(() => import("../components/Chemistry/Grade9/AcidsBases"));
const ECM = lazy(() => import("../components/Chemistry/Grade9/ECM"));
const Indicators = lazy(() => import("../components/Chemistry/Grade9/Indicators"));
const LawConservationMass = lazy(() => import("../components/Chemistry/Grade9/LawConservationMass"));
const MatterState = lazy(() => import("../components/Chemistry/Grade9/MatterState"));
const MixturesSeparation = lazy(() => import("../components/Chemistry/Grade9/MixturesSeparation"));
const PhysicalChemicalChanges = lazy(() => import("../components/Chemistry/Grade9/PhysicalChemicalChanges"));
const ReactionMetalswAcids = lazy(() => import("../components/Chemistry/Grade9/ReactionMetalswAcids"));
const RustingIron = lazy(() => import("../components/Chemistry/Grade9/RustingIron"));

// Grade 9 - Biology
const Biology = lazy(() => import("../components/Biology/Grade9/Biology"));
const Diffusion = lazy(() => import("../components/Biology/Grade9/Diffusion"));
const Microorganisms = lazy(() => import("../components/Biology/Grade9/Microorganisms"));
const MicroscopeUse = lazy(() => import("../components/Biology/Grade9/MicroscopeUse"));
const Osmosis = lazy(() => import("../components/Biology/Grade9/Osmosis"));
const Photosynthesis = lazy(() => import("../components/Biology/Grade9/Photosynthesis"));
const PlantCells = lazy(() => import("../components/Biology/Grade9/PlantCells"));
const Respiration = lazy(() => import("../components/Biology/Grade9/Respiration"));
const SeedGermination = lazy(() => import("../components/Biology/Grade9/SeedGermination"));
const StarchTest = lazy(() => import("../components/Biology/Grade9/StarchTest"));

// Grade 9 - Maths
const Maths = lazy(() => import("../components/Maths/Grade9/Maths"));
const NumberSystems = lazy(() => import("../components/Maths/Grade9/NumberSystems"));
const AlgebraicExpressions = lazy(() => import("../components/Maths/Grade9/AlgebraicExpressions"));
const CoordinateGeometry = lazy(() => import("../components/Maths/Grade9/CoordinateGeometry"));
const ExponentsPowers = lazy(() => import("../components/Maths/Grade9/ExponentsPowers"));
const GeometryMeasurements = lazy(() => import("../components/Maths/Grade9/GeometryMeasurements"));
const IrrationalNumbers = lazy(() => import("../components/Maths/Grade9/IrrationalNumbers"));
const LinearEquations = lazy(() => import("../components/Maths/Grade9/LinearEquations"));
const Polynomials = lazy(() => import("../components/Maths/Grade9/Polynomials"));
const ProfitLoss = lazy(() => import("../components/Maths/Grade9/ProfitLoss"));

// Grade 9 - ICT
const ICT = lazy(() => import("../components/ICT/Grade9/ICT"));
const EmailSimulator = lazy(() => import("../components/ICT/Grade9/EmailSimulator"));
const TypingSpeed = lazy(() => import("../components/ICT/Grade9/TypingSpeed"));
const FileManagement = lazy(() => import("../components/ICT/Grade9/FileManagement"));
const InternetSafety = lazy(() => import("../components/ICT/Grade9/InternetSafety"));
const Networking = lazy(() => import("../components/ICT/Grade9/Networking"));
const Programming = lazy(() => import("../components/ICT/Grade9/Programming"));

// Grade 10 - Chemistry
const Chemistryten = lazy(() => import("../components/Chemistry/Grade10/Chemistry"));
const AcidsBasesG10 = lazy(() => import("../components/Chemistry/Grade10/AcidsBases"));
const BalancingChemical = lazy(() => import("../components/Chemistry/Grade10/BalancingChemical"));
const ChemicalBonding = lazy(() => import("../components/Chemistry/Grade10/ChemicalBonding"));
const ChemicalReactions = lazy(() => import("../components/Chemistry/Grade10/ChemicalReactions"));
const Combustion = lazy(() => import("../components/Chemistry/Grade10/Combustion"));
const MetalReactivity = lazy(() => import("../components/Chemistry/Grade10/MetalReactivity"));
const PeriodicTable = lazy(() => import("../components/Chemistry/Grade10/PeriodicTable"));
const RustingCorrosion = lazy(() => import("../components/Chemistry/Grade10/RustingCorrosion"));
const ThermalDecomposition = lazy(() => import("../components/Chemistry/Grade10/ThermalDecomposition"));
const PHIndicators = lazy(() => import("../components/Chemistry/Grade10/pHIndicators"));

// Grade 10 - Biology
const Biologyten = lazy(() => import("../components/Biology/Grade10/Biology"));
const BloodComponents = lazy(() => import("../components/Biology/Grade10/BloodComponents"));
const EffectLight = lazy(() => import("../components/Biology/Grade10/EffectLight"));
const EnzymeActivity = lazy(() => import("../components/Biology/Grade10/EnzymeActivity"));
const LeafStructure = lazy(() => import("../components/Biology/Grade10/LeafStructure"));
const Photosynthesisg10 = lazy(() => import("../components/Biology/Grade10/Photosynthesis"));
const AnimalCell = lazy(() => import("../components/Biology/Grade10/AnimalCell"));
const PlantHormones = lazy(() => import("../components/Biology/Grade10/PlantHormones"));
const RespirationG10 = lazy(() => import("../components/Biology/Grade10/Respiration"));
const Transpiration = lazy(() => import("../components/Biology/Grade10/Transpiration"));

// Grade 10 - Maths
const Mathsten = lazy(() => import("../components/Maths/Grade10/Maths"));

// Grade 10 - ICT
const ICTten = lazy(() => import("../components/ICT/Grade10/ICT"));
const CyberSecurity = lazy(() => import("../components/ICT/Grade10/CyberSecurity"));
const DatabaseBasics = lazy(() => import("../components/ICT/Grade10/DatabaseBasics"));
const NetworkTopology = lazy(() => import("../components/ICT/Grade10/NetworkTopology"));
const ProgrammingFundamentals = lazy(() => import("../components/ICT/Grade10/ProgrammingFundamentals"));
const WebDesign = lazy(() => import("../components/ICT/Grade10/WebDesign"));

// Grade 10 - Physics
const PhysicsTen = lazy(() => import("../components/Physics/Grade10/Physics"));
const Electricityten = lazy(() => import("../components/Physics/Grade10/Electricity"));
const HeatThermodynamics = lazy(() => import("../components/Physics/Grade10/HeatThermodynamics"));
const Light = lazy(() => import("../components/Physics/Grade10/Light"));
const MagnetismElectromagnetism = lazy(() => import("../components/Physics/Grade10/MagnetismElectromagnetism"));
const MotionForces = lazy(() => import("../components/Physics/Grade10/MotionForces"));
const PracticalElectronics = lazy(() => import("../components/Physics/Grade10/PracticalElectronics"));
const SoundWaves = lazy(() => import("../components/Physics/Grade10/SoundWaves"));
const StaticElectricity = lazy(() => import("../components/Physics/Grade10/StaticElectricity"));
const WEPTEN = lazy(() => import("../components/Physics/Grade10/WEP"));

// Grade 11
const Physicseleven = lazy(() => import("../components/Physics/Grade11/Physics"));
const MotionGrapics = lazy(() => import("../components/Physics/Grade11/MotionGraphics"));
const ProjectileMotion = lazy(() => import("../components/Physics/Grade11/ProjectileMotion"));
const NewtonSecLaw = lazy(() => import("../components/Physics/Grade11/NewtonSecLaw"));
const FrictionInclinedPlane = lazy(() => import("../components/Physics/Grade11/FrictionInclinedPlane"));
const ConservationMomentum = lazy(() => import("../components/Physics/Grade11/ConservationMomentum"));
const WorkEnergyPrinciple = lazy(() => import("../components/Physics/Grade11/WorkEnergyPrinciple"));
const MeasuringPowerMotor = lazy(() => import("../components/Physics/Grade11/MeasuringPowerMotor"));
const ThermalExpansionSolid = lazy(() => import("../components/Physics/Grade11/ThermalExpansionSolid"));
const HeatCapacityWater = lazy(() => import("../components/Physics/Grade11/HeatCapacityWater"));
const ReflactionRefractionRight = lazy(() => import("../components/Physics/Grade11/ReflactionRefractionRight"));
const FocalLengthLens = lazy(() => import("../components/Physics/Grade11/FocalLengthLens"));
const SeriesParallalResister = lazy(() => import("../components/Physics/Grade11/SeriesParallalResister"));
const CurrentCarryCoil = lazy(() => import("../components/Physics/Grade11/CurrentCarryCoil"));
const ElectroMagnaticInduction = lazy(() => import("../components/Physics/Grade11/ElectroMagnaticInduction"));

const Chemistryeleven = lazy(() => import("../components/Chemistry/Grade11/Chemistry"));
const Chem11MoleConcept = lazy(() => import("../components/Chemistry/Grade11/MoleConcept"));
const Chem11Stoichiometry = lazy(() => import("../components/Chemistry/Grade11/Stoichiometry"));
const Chem11GasLaws = lazy(() => import("../components/Chemistry/Grade11/GasLaws"));
const Chem11AtomicStructure = lazy(() => import("../components/Chemistry/Grade11/AtomicStructure"));
const Chem11ChemicalBonding = lazy(() => import("../components/Chemistry/Grade11/ChemicalBonding"));
const Chem11Thermochemistry = lazy(() => import("../components/Chemistry/Grade11/Thermochemistry"));
const Chem11EmpiricalFormula = lazy(() => import("../components/Chemistry/Grade11/EmpiricalFormula"));
const Chem11SolutionPreparation = lazy(() => import("../components/Chemistry/Grade11/SolutionPreparation"));
const Chem11Titration = lazy(() => import("../components/Chemistry/Grade11/Titration"));
const Biologyeleven = lazy(() => import("../components/Biology/Grade11/Biology"));
const Bio11DNAExtraction = lazy(() => import("../components/Biology/Grade11/DNAExtraction"));
const Bio11NerveFunction = lazy(() => import("../components/Biology/Grade11/NerveFunction"));
const Bio11BloodPressure = lazy(() => import("../components/Biology/Grade11/BloodPressure"));
const Bio11MicrobialCulture = lazy(() => import("../components/Biology/Grade11/MicrobialCulture"));
const Bio11EnzymeActivity = lazy(() => import("../components/Biology/Grade11/EnzymeActivity"));
const Bio11PhotosynthesisRate = lazy(() => import("../components/Biology/Grade11/PhotosynthesisRate"));
const Bio11CellularRespiration = lazy(() => import("../components/Biology/Grade11/CellularRespiration"));
const Bio11MitosisStudy = lazy(() => import("../components/Biology/Grade11/MitosisStudy"));
const Bio11BloodTyping = lazy(() => import("../components/Biology/Grade11/BloodTyping"));
const Bio11MuscleReflex = lazy(() => import("../components/Biology/Grade11/MuscleReflex"));
const Bio11CustomWork = lazy(() => import("../components/Biology/Grade11/CustomWork"));
const Mathseleven = lazy(() => import("../components/Maths/Grade11/Maths"));
const ICTeleven = lazy(() => import("../components/ICT/Grade11/ICT"));
const ICT11DataStructures = lazy(() => import("../components/ICT/Grade11/DataStructures"));
const ICT11Algorithms = lazy(() => import("../components/ICT/Grade11/Algorithms"));
const ICT11MobileAppDev = lazy(() => import("../components/ICT/Grade11/MobileAppDev"));
const ICT11CloudComputing = lazy(() => import("../components/ICT/Grade11/CloudComputing"));
const ICT11ServerManagement = lazy(() => import("../components/ICT/Grade11/ServerManagement"));
const ICT11CustomWork = lazy(() => import("../components/ICT/Grade11/CustomWork"));
const Drawingeleven = lazy(() => import("../components/Drawing/Grade11/Drawing"));

// Grade 12
const PhysicsTweelve = lazy(() => import("../components/Physics/Grade12/Physics"));
const G12UniformCircularMotion = lazy(() => import("../components/Physics/Grade12/UniformCircularMotion"));
const G12CentripetalForce = lazy(() => import("../components/Physics/Grade12/CentripetalForce"));
const G12HookesLawSprings = lazy(() => import("../components/Physics/Grade12/HookesLawSprings"));
const G12SimpleHarmonicMotion = lazy(() => import("../components/Physics/Grade12/SimpleHarmonicMotion"));
const G12StandingWaves = lazy(() => import("../components/Physics/Grade12/StandingWaves"));
const G12InterferenceDiffraction = lazy(() => import("../components/Physics/Grade12/InterferenceDiffraction"));
const G12ElectricFields = lazy(() => import("../components/Physics/Grade12/ElectricFields"));
const G12ChargingCapacitors = lazy(() => import("../components/Physics/Grade12/ChargingCapacitors"));
const G12KirchhoffsLaws = lazy(() => import("../components/Physics/Grade12/KirchhoffsLaws"));
const G12ACCircuits = lazy(() => import("../components/Physics/Grade12/ACCircuits"));
const G12ElectromagneticInduction = lazy(() => import("../components/Physics/Grade12/ElectromagneticInduction"));
const G12PhotoelectricEffect = lazy(() => import("../components/Physics/Grade12/PhotoelectricEffect"));
const G12Radioactivity = lazy(() => import("../components/Physics/Grade12/Radioactivity"));
const G12AtomicSpectra = lazy(() => import("../components/Physics/Grade12/AtomicSpectra"));
const ChemistryTweelve = lazy(() => import("../components/Chemistry/Grade12/Chemistry"));
const BiologyTweelve = lazy(() => import("../components/Biology/Grade12/Biology"));
const Bio12Genetics = lazy(() => import("../components/Biology/Grade12/Genetics"));
const Bio12MicroscopicStudy = lazy(() => import("../components/Biology/Grade12/MicroscopicStudy"));
const Bio12Physiology = lazy(() => import("../components/Biology/Grade12/Physiology"));
const Bio12Virology = lazy(() => import("../components/Biology/Grade12/Virology"));
const Bio12Biochemistry = lazy(() => import("../components/Biology/Grade12/Biochemistry"));
const Bio12PlantPhysiology = lazy(() => import("../components/Biology/Grade12/PlantPhysiology"));
const Bio12Neurobiology = lazy(() => import("../components/Biology/Grade12/Neurobiology"));
const Bio12CustomWork = lazy(() => import("../components/Biology/Grade12/CustomWork"));
const MathsTweelve = lazy(() => import("../components/Maths/Grade12/Maths"));
const ICTTweelve = lazy(() => import("../components/ICT/Grade12/ICT"));
const DrawingTweelve = lazy(() => import("../components/Drawing/Grade12/Drawing"));

// Games
const MathsGameBoard = lazy(() => import("../components/game/maths/MathsGameBoard"));
const PhysicsGameBoard = lazy(() => import("../components/game/physics/PhysicsGameBoard"));

const LabRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/physics/grade10/ohms-law" element={<OhmsLaw />} />
        <Route path="/physics/grade10/ohms-law" element={<OhmsLaw />} />
        {/* Grade 9 - Physics */}
        <Route path="/labs/grade9/physics" element={<Physics />} />
        <Route path="/physics/grade9/measurement-units" element={<MeasurementUnits />} />
        <Route path="/physics/grade9/electricity" element={<Electricity />} />
        <Route path="/physics/grade9/friction" element={<Friction />} />
        <Route path="/physics/grade9/heat-temperature" element={<HeatTemperature />} />
        <Route path="/physics/grade9/magnetism" element={<Magnetism />} />
        <Route path="/physics/grade9/motion-speed" element={<MotionSpeed />} />
        <Route path="/physics/grade9/newtons-laws" element={<Newtons />} />
        <Route path="/physics/grade9/sound" element={<Sound />} />
        <Route path="/physics/grade9/work-energy-power" element={<WEP />} />

        {/* Grade 9 - Chemistry */}
        <Route path="/labs/grade9/Chemistry" element={<Chemistry />} />
        <Route path="/chemistry/grade9/lab-safety" element={<LabSafety />} />
        <Route path="/chemistry/grade9/acids-bases" element={<AcidsBases />} />
        <Route path="/chemistry/grade9/elements-compounds" element={<ECM />} />
        <Route path="/chemistry/grade9/indicators" element={<Indicators />} />
        <Route path="/chemistry/grade9/law-conservation-mass" element={<LawConservationMass />} />
        <Route path="/chemistry/grade9/states-of-matter" element={<MatterState />} />
        <Route path="/chemistry/grade9/separation-techniques" element={<MixturesSeparation />} />
        <Route path="/chemistry/grade9/physical-chemical-changes" element={<PhysicalChemicalChanges />} />
        <Route path="/chemistry/grade9/metals-acids" element={<ReactionMetalswAcids />} />
        <Route path="/chemistry/grade9/rusting" element={<RustingIron />} />

        {/* Grade 9 - Biology */}
        <Route path="/labs/grade9/Biology" element={<Biology />} />
        <Route path="/biology/grade9/diffusion" element={<Diffusion />} />
        <Route path="/biology/grade9/microorganisms" element={<Microorganisms />} />
        <Route path="/biology/grade9/microscope-use" element={<MicroscopeUse />} />
        <Route path="/biology/grade9/osmosis" element={<Osmosis />} />
        <Route path="/biology/grade9/photosynthesis" element={<Photosynthesis />} />
        <Route path="/biology/grade9/plant-cells" element={<PlantCells />} />
        <Route path="/biology/grade9/respiration" element={<Respiration />} />
        <Route path="/biology/grade9/seed-germination" element={<SeedGermination />} />
        <Route path="/biology/grade9/starch-test" element={<StarchTest />} />

        {/* Grade 9 - Maths */}
        <Route path="/labs/grade9/Maths" element={<Maths />} />
        <Route path="/maths/grade9/number-systems" element={<NumberSystems />} />
        <Route path="/maths/grade9/algebraic-expressions" element={<AlgebraicExpressions />} />
        <Route path="/maths/grade9/coordinate-geometry" element={<CoordinateGeometry />} />
        <Route path="/maths/grade9/exponents-powers" element={<ExponentsPowers />} />
        <Route path="/maths/grade9/geometry" element={<GeometryMeasurements />} />
        <Route path="/maths/grade9/irrational-numbers" element={<IrrationalNumbers />} />
        <Route path="/maths/grade9/linear-equations" element={<LinearEquations />} />
        <Route path="/maths/grade9/polynomials" element={<Polynomials />} />
        <Route path="/maths/grade9/profit-loss" element={<ProfitLoss />} />

        {/* Grade 9 - ICT */}
        <Route path="/labs/grade9/ICT" element={<ICT />} />
        <Route path="/ict/grade9/typing-speed-test" element={<TypingSpeed />} />
        <Route path="/ict/grade9/email-simulator" element={<EmailSimulator />} />
        <Route path="/ict/grade9/file-management" element={<FileManagement />} />
        <Route path="/ict/grade9/internet-safety" element={<InternetSafety />} />
        <Route path="/ict/grade9/networking-basics" element={<Networking />} />
        <Route path="/ict/grade9/basic-programming" element={<Programming />} />

        {/* Grade 10 - Chemistry */}
        <Route path="/labs/grade10/Chemistry" element={<Chemistryten />} />
        <Route path="/chemistry/grade10/phindicators" element={<PHIndicators />} />
        <Route path="/chemistry/grade10/acids-bases" element={<AcidsBasesG10 />} />
        <Route path="/chemistry/grade10/balancing-equations" element={<BalancingChemical />} />
        <Route path="/chemistry/grade10/chemical-bonding" element={<ChemicalBonding />} />
        <Route path="/chemistry/grade10/reactions-types" element={<ChemicalReactions />} />
        <Route path="/chemistry/grade10/combustion" element={<Combustion />} />
        <Route path="/chemistry/grade10/metals-reactivity" element={<MetalReactivity />} />
        <Route path="/chemistry/grade10/periodic-table" element={<PeriodicTable />} />
        <Route path="/chemistry/grade10/rusting" element={<RustingCorrosion />} />
        <Route path="/chemistry/grade10/thermal-decomposition" element={<ThermalDecomposition />} />

        {/* Grade 10 - Biology */}
        <Route path="/labs/grade10/Biology" element={<Biologyten />} />
        <Route path="/biology/grade10/animal-cells" element={<AnimalCell />} />
        <Route path="/biology/grade10/blood-components" element={<BloodComponents />} />
        <Route path="/biology/grade10/light-effect" element={<EffectLight />} />
        <Route path="/biology/grade10/enzyme-activity" element={<EnzymeActivity />} />
        <Route path="/biology/grade10/leaf-structure" element={<LeafStructure />} />
        <Route path="/biology/grade10/photosynthesis" element={<Photosynthesisg10 />} />
        <Route path="/biology/grade10/plant-hormones" element={<PlantHormones />} />
        <Route path="/biology/grade10/respiration" element={<RespirationG10 />} />
        <Route path="/biology/grade10/transpiration" element={<Transpiration />} />

        {/* Grade 10 - Maths */}
        <Route path="/labs/grade10/Maths" element={<Mathsten />} />

        {/* Grade 10 - ICT */}
        <Route path="/labs/grade10/ICT" element={<ICTten />} />
        <Route path="/ict/grade10/cyber-security" element={<CyberSecurity />} />
        <Route path="/ict/grade10/database-basics" element={<DatabaseBasics />} />
        <Route path="/ict/grade10/network-topology" element={<NetworkTopology />} />
        <Route path="/ict/grade10/programming-fundamentals" element={<ProgrammingFundamentals />} />
        <Route path="/ict/grade10/web-design" element={<WebDesign />} />

        {/* Grade 10 - Physics */}
        <Route path="/labs/grade10/physics" element={<PhysicsTen />} />
        <Route path="/physics/grade10/electricity" element={<Electricityten />} />
        <Route path="/physics/grade10/heat-thermodynamics" element={<HeatThermodynamics />} />
        <Route path="/physics/grade10/light-optics" element={<Light />} />
        <Route path="/physics/grade10/magnetism" element={<MagnetismElectromagnetism />} />
        <Route path="/physics/grade10/motion-forces" element={<MotionForces />} />
        <Route path="/physics/grade10/OhmsLaw" element={<OhmsLaw />} />
        <Route path="/physics/grade10/practical-electronics" element={<PracticalElectronics />} />
        <Route path="/physics/grade10/sound-waves" element={<SoundWaves />} />
        <Route path="/physics/grade10/static-electricity" element={<StaticElectricity />} />
        <Route path="/physics/grade10/work-energy-power" element={<WEPTEN />} />

        {/* Grade 11 */}
        <Route path="/labs/grade11/physics" element={<Physicseleven />} />
        <Route path="/physics/grade11/motion-graph-analysis" element={<MotionGrapics />} />
        <Route path="/physics/grade11/projectile-motion" element={<ProjectileMotion />} />
        <Route path="/physics/grade11/newtons-second-law" element={<NewtonSecLaw />} />
        <Route path="/physics/grade11/friction" element={<FrictionInclinedPlane />} />
        <Route path="/physics/grade11/conservation-of-momentum" element={<ConservationMomentum />} />
        <Route path="/physics/grade11/work-energy-principle" element={<WorkEnergyPrinciple />} />
        <Route path="/physics/grade11/power" element={<MeasuringPowerMotor />} />
        <Route path="/physics/grade11/thermal-expansion" element={<ThermalExpansionSolid />} />
        <Route path="/physics/grade11/specific-heat" element={<HeatCapacityWater />} />
        <Route path="/physics/grade11/reflection-refraction" element={<ReflactionRefractionRight />} />
        <Route path="/physics/grade11/lens-experiment" element={<FocalLengthLens />} />
        <Route path="/physics/grade11/ohms-law" element={<OhmsLaw />} />
        <Route path="/physics/grade11/resistance-series-parallel" element={<SeriesParallalResister />} />
        <Route path="/physics/grade11/magnetic-field-coil" element={<CurrentCarryCoil />} />
        <Route path="/physics/grade11/induced-current" element={<ElectroMagnaticInduction />} />

        {/* Grade 11 - Others */}
        <Route path="/labs/grade11/Chemistry" element={<Chemistryeleven />} />
        <Route path="/chemistry/grade11/mole-concept" element={<Chem11MoleConcept />} />
        <Route path="/chemistry/grade11/stoichiometry" element={<Chem11Stoichiometry />} />
        <Route path="/chemistry/grade11/gas-laws" element={<Chem11GasLaws />} />
        <Route path="/chemistry/grade11/atomic-structure" element={<Chem11AtomicStructure />} />
        <Route path="/chemistry/grade11/chemical-bonding" element={<Chem11ChemicalBonding />} />
        <Route path="/chemistry/grade11/thermochemistry" element={<Chem11Thermochemistry />} />
        <Route path="/chemistry/grade11/empirical-formula" element={<Chem11EmpiricalFormula />} />
        <Route path="/chemistry/grade11/solution-preparation" element={<Chem11SolutionPreparation />} />
        <Route path="/chemistry/grade11/titration" element={<Chem11Titration />} />
        <Route path="/labs/grade11/Biology" element={<Biologyeleven />} />
        <Route path="/biology/grade11/dna-extraction" element={<Bio11DNAExtraction />} />
        <Route path="/biology/grade11/nerve-function" element={<Bio11NerveFunction />} />
        <Route path="/biology/grade11/blood-pressure" element={<Bio11BloodPressure />} />
        <Route path="/biology/grade11/microbial-culture" element={<Bio11MicrobialCulture />} />
        <Route path="/biology/grade11/enzyme-activity" element={<Bio11EnzymeActivity />} />
        <Route path="/biology/grade11/photosynthesis-rate" element={<Bio11PhotosynthesisRate />} />
        <Route path="/biology/grade11/cellular-respiration" element={<Bio11CellularRespiration />} />
        <Route path="/biology/grade11/mitosis-study" element={<Bio11MitosisStudy />} />
        <Route path="/biology/grade11/blood-typing" element={<Bio11BloodTyping />} />
        <Route path="/biology/grade11/muscle-reflex" element={<Bio11MuscleReflex />} />
        <Route path="/biology/grade11/custom-work" element={<Bio11CustomWork />} />
        <Route path="/labs/grade11/Maths" element={<Mathseleven />} />
        <Route path="/labs/grade11/ICT" element={<ICTeleven />} />
        <Route path="/ict/grade11/data-structures" element={<ICT11DataStructures />} />
        <Route path="/ict/grade11/algorithms" element={<ICT11Algorithms />} />
        <Route path="/ict/grade11/mobile-app-dev" element={<ICT11MobileAppDev />} />
        <Route path="/ict/grade11/cloud-computing" element={<ICT11CloudComputing />} />
        <Route path="/ict/grade11/server-management" element={<ICT11ServerManagement />} />
        <Route path="/ict/grade11/custom-work" element={<ICT11CustomWork />} />
        <Route path="/labs/grade11/Drawing" element={<Drawingeleven />} />

        {/* Grade 12 */}
        <Route path="/labs/grade12/physics" element={<PhysicsTweelve />} />
        <Route path="/physics/grade12/uniform-circular-motion" element={<G12UniformCircularMotion />} />
        <Route path="/physics/grade12/centripetal-force" element={<G12CentripetalForce />} />
        <Route path="/physics/grade12/hookes-law-springs" element={<G12HookesLawSprings />} />
        <Route path="/physics/grade12/simple-harmonic-motion" element={<G12SimpleHarmonicMotion />} />
        <Route path="/physics/grade12/standing-waves" element={<G12StandingWaves />} />
        <Route path="/physics/grade12/interference-diffraction" element={<G12InterferenceDiffraction />} />
        <Route path="/physics/grade12/electric-fields" element={<G12ElectricFields />} />
        <Route path="/physics/grade12/charging-capacitors" element={<G12ChargingCapacitors />} />
        <Route path="/physics/grade12/kirchhoffs-laws" element={<G12KirchhoffsLaws />} />
        <Route path="/physics/grade12/ac-circuits" element={<G12ACCircuits />} />
        <Route path="/physics/grade12/electromagnetic-induction" element={<G12ElectromagneticInduction />} />
        <Route path="/physics/grade12/photoelectric-effect" element={<G12PhotoelectricEffect />} />
        <Route path="/physics/grade12/radioactivity" element={<G12Radioactivity />} />
        <Route path="/physics/grade12/atomic-spectra" element={<G12AtomicSpectra />} />
        <Route path="/labs/grade12/Chemistry" element={<ChemistryTweelve />} />
        <Route path="/labs/grade12/Biology" element={<BiologyTweelve />} />
        <Route path="/biology/grade12/genetics" element={<Bio12Genetics />} />
        <Route path="/biology/grade12/microscopic-study" element={<Bio12MicroscopicStudy />} />
        <Route path="/biology/grade12/physiology" element={<Bio12Physiology />} />
        <Route path="/biology/grade12/virology" element={<Bio12Virology />} />
        <Route path="/biology/grade12/biochemistry" element={<Bio12Biochemistry />} />
        <Route path="/biology/grade12/plant-physiology" element={<Bio12PlantPhysiology />} />
        <Route path="/biology/grade12/neurobiology" element={<Bio12Neurobiology />} />
        <Route path="/biology/grade12/custom-work" element={<Bio12CustomWork />} />
        <Route path="/labs/grade12/Maths" element={<MathsTweelve />} />
        <Route path="/labs/grade12/ICT" element={<ICTTweelve />} />
        <Route path="/labs/grade12/Drawing" element={<DrawingTweelve />} />

        {/* Games */}
        <Route path="/labs/game/maths" element={<MathsGameBoard />} />
        <Route path="/labs/game/physics" element={<PhysicsGameBoard />} />
      </Routes>
    </Suspense>
=======
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard"; 
import OhmsLaw from "../components/Physics/Grade10/Ohmlaw"; 
// grade 9
import Physics from "../components/Physics/Grade9/Physics"; // adjust path if needed
import MeasurementUnits from "../components/Physics/Grade9/Measurementunits"; // adjust path if needed
import Electricity from "../components/Physics/Grade9/Electricity"; // adjust path if needed
import Friction from "../components/Physics/Grade9/Friction"; // adjust path if needed
import HeatTemperature from "../components/Physics/Grade9/HeatTemperature"; // adjust path if needed
import Magnetism from "../components/Physics/Grade9/Magnetism"; // adjust path if needed
import MotionSpeed from "../components/Physics/Grade9/MotionSpeed"; // adjust path if needed
import Newtons from "../components/Physics/Grade9/Newtons"; // adjust path if needed
import Sound from "../components/Physics/Grade9/Sound"; // adjust path if needed
import WEP from "../components/Physics/Grade9/WEP"; // adjust path if needed

import Chemistry from "../components/Chemistry/Grade9/Chemistry"; // adjust path if needed
import LabSafety from "../components/Chemistry/Grade9/LabSafety"; // adjust path if needed
import AcidsBases from "../components/Chemistry/Grade9/AcidsBases"; // adjust path if needed
import ECM from "../components/Chemistry/Grade9/ECM"; // adjust path if needed
import Indicators from "../components/Chemistry/Grade9/Indicators"; // adjust path if needed
import LawConservationMass from "../components/Chemistry/Grade9/LawConservationMass"; // adjust path if needed
import MatterState from "../components/Chemistry/Grade9/MatterState"; // adjust path if needed
import MixturesSeparation from "../components/Chemistry/Grade9/MixturesSeparation"; // adjust path if needed
import PhysicalChemicalChanges from "../components/Chemistry/Grade9/PhysicalChemicalChanges"; // adjust path if needed
import ReactionMetalswAcids from "../components/Chemistry/Grade9/ReactionMetalswAcids"; // adjust path if needed
import RustingIron from "../components/Chemistry/Grade9/RustingIron"; // adjust path if needed

import Biology from "../components/Biology/Grade9/Biology"; // adjust path if needed
import Diffusion from "../components/Biology/Grade9/Diffusion"; // adjust path if needed
import Microorganisms from "../components/Biology/Grade9/Microorganisms"; // adjust path if needed
import MicroscopeUse from "../components/Biology/Grade9/MicroscopeUse"; // adjust path if needed
import Osmosis from "../components/Biology/Grade9/Osmosis"; // adjust path if needed
import Photosynthesis from "../components/Biology/Grade9/Photosynthesis"; // adjust path if needed
import PlantCells from "../components/Biology/Grade9/PlantCells"; // adjust path if needed
import Respiration from "../components/Biology/Grade9/Respiration"; // adjust path if needed
import SeedGermination from "../components/Biology/Grade9/SeedGermination"; // adjust path if needed
import StarchTest from "../components/Biology/Grade9/StarchTest"; // adjust path if needed

import Maths from "../components/Maths/Grade9/Maths"; // adjust path if needed
import NumberSystems from "../components/Maths/Grade9/NumberSystems"; // adjust path if needed
import AlgebraicExpressions from "../components/Maths/Grade9/AlgebraicExpressions"; // adjust path if needed
import CoordinateGeometry from "../components/Maths/Grade9/CoordinateGeometry"; // adjust path if needed
import ExponentsPowers from "../components/Maths/Grade9/ExponentsPowers"; // adjust path if needed
import GeometryMeasurements from "../components/Maths/Grade9/GeometryMeasurements"; // adjust path if needed
import IrrationalNumbers from "../components/Maths/Grade9/IrrationalNumbers"; // adjust path if needed
import LinearEquations from "../components/Maths/Grade9/LinearEquations"; // adjust path if needed
import Polynomials from "../components/Maths/Grade9/Polynomials"; // adjust path if needed
import ProfitLoss from "../components/Maths/Grade9/ProfitLoss"; // adjust path if needed

import ICT from "../components/ICT/Grade9/ICT"; // adjust path if needed
import EmailSimulator from "../components/ICT/Grade9/EmailSimulator"; // adjust path if needed
import TypingSpeed from "../components/ICT/Grade9/TypingSpeed"; // adjust path if needed
import FileManagement from "../components/ICT/Grade9/FileManagement"; // adjust path if needed
import InternetSafety from "../components/ICT/Grade9/InternetSafety"; // adjust path if needed
import Networking from "../components/ICT/Grade9/Networking"; // adjust path if needed
import Programming from "../components/ICT/Grade9/Programming"; // adjust path if needed
// grade 10
import Chemistryten from "../components/Chemistry/Grade10/Chemistry"; // adjust path if needed
import AcidsBasesG10 from "../components/Chemistry/Grade10/AcidsBases"; // adjust path if needed
import BalancingChemical from "../components/Chemistry/Grade10/BalancingChemical"; // adjust path if needed
import ChemicalBonding from "../components/Chemistry/Grade10/ChemicalBonding"; // adjust path if needed
import ChemicalReactions from "../components/Chemistry/Grade10/ChemicalReactions"; // adjust path if needed
import Combustion from "../components/Chemistry/Grade10/Combustion"; // adjust path if needed
import MetalReactivity from "../components/Chemistry/Grade10/MetalReactivity"; // adjust path if needed
import PeriodicTable from "../components/Chemistry/Grade10/PeriodicTable"; // adjust path if needed
import RustingCorrosion from "../components/Chemistry/Grade10/RustingCorrosion"; // adjust path if needed
import ThermalDecomposition from "../components/Chemistry/Grade10/ThermalDecomposition"; // adjust path if needed
import PHIndicators from "../components/Chemistry/Grade10/pHIndicators";

import Biologyten from "../components/Biology/Grade10/Biology"; // adjust path if needed
import BloodComponents from "../components/Biology/Grade10/BloodComponents"; // adjust path if needed
import EffectLight from "../components/Biology/Grade10/EffectLight"; // adjust path if needed
import EnzymeActivity from "../components/Biology/Grade10/EnzymeActivity"; // adjust path if needed
import LeafStructure from "../components/Biology/Grade10/LeafStructure"; // adjust path if needed
import Photosynthesisg10 from "../components/Biology/Grade10/Photosynthesis"; // adjust path if needed
import AnimalCell from "../components/Biology/Grade10/AnimalCell"; // adjust path if needed
import PlantHormones from "../components/Biology/Grade10/PlantHormones"; // adjust path if needed
import RespirationG10 from "../components/Biology/Grade10/Respiration"; // adjust path if needed
import Transpiration from "../components/Biology/Grade10/Transpiration"; // adjust path if needed


import Mathsten from "../components/Maths/Grade10/Maths"; // adjust path if needed

import ICTten from "../components/ICT/Grade10/ICT"; // adjust path if needed
import CyberSecurity from "../components/ICT/Grade10/CyberSecurity"; // adjust path if needed
import DatabaseBasics from "../components/ICT/Grade10/DatabaseBasics"; // adjust path if needed
import NetworkTopology from "../components/ICT/Grade10/NetworkTopology"; // adjust path if needed
import ProgrammingFundamentals from "../components/ICT/Grade10/ProgrammingFundamentals"; // adjust path if needed
import WebDesign from "../components/ICT/Grade10/WebDesign"; // adjust path if needed

import PhysicsTen from "../components/Physics/Grade10/Physics"; // adjust path if needed 
import Electricityten from "../components/Physics/Grade10/Electricity"; // adjust path if needed 
import HeatThermodynamics from "../components/Physics/Grade10/HeatThermodynamics"; // adjust path if needed 
import Light from "../components/Physics/Grade10/Light"; // adjust path if needed 
import MagnetismElectromagnetism from "../components/Physics/Grade10/MagnetismElectromagnetism"; // adjust path if needed 
import MotionForces from "../components/Physics/Grade10/MotionForces"; // adjust path if needed 
// import OhmsLaw from "../components/Physics/Grade10/Ohmlaw"; // adjust path if needed 
import PracticalElectronics from "../components/Physics/Grade10/PracticalElectronics"; // adjust path if needed 
import SoundWaves from "../components/Physics/Grade10/SoundWaves"; // adjust path if needed 
import StaticElectricity from "../components/Physics/Grade10/StaticElectricity"; // adjust path if needed Electricity
import WEPTEN from "../components/Physics/Grade10/WEP"; // adjust path if needed Electricity

// graed 11
import Physicseleven from "../components/Physics/Grade11/Physics"; // adjust path if needed
import Chemistryeleven from "../components/Chemistry/Grade11/Chemistry"; // adjust path if needed
import Biologyeleven from "../components/Biology/Grade11/Biology"; // adjust path if needed
import Mathseleven from "../components/Maths/Grade11/Maths"; // adjust path if needed
import ICTeleven from "../components/ICT/Grade11/ICT"; // adjust path if needed
import Drawingeleven from "../components/Drawing/Grade11/Drawing"; // adjust path if needed
// grade 12
import PhysicsTweelve from "../components/Physics/Grade12/Physics"; // adjust path if needed
import ChemistryTweelve from "../components/Chemistry/Grade12/Chemistry"; // adjust path if needed
import BiologyTweelve from "../components/Biology/Grade12/Biology"; // adjust path if needed
import MathsTweelve from "../components/Maths/Grade12/Maths"; // adjust path if needed
import ICTTweelve from "../components/ICT/Grade12/ICT"; // adjust path if needed
import DrawingTweelve from "../components/Drawing/Grade12/Drawing";

const LabRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/physics/grade10/ohms-law" element={<OhmsLaw />} />
      <Route path="/physics/grade10/ohms-law" element={<OhmsLaw />} />
      {/* grade 9 */}
      <Route path="/labs/grade9/physics" element={<Physics />} /> {/* New Route */}
      <Route path="/physics/grade9/measurement-units" element={<MeasurementUnits />} /> {/* New Route */}
      <Route path="/physics/grade9/electricity" element={<Electricity />} /> {/* New Route */}
      <Route path="/physics/grade9/friction" element={<Friction />} /> {/* New Route */}
      <Route path="/physics/grade9/heat-temperature" element={<HeatTemperature />} /> {/* New Route */}
      <Route path="/physics/grade9/magnetism" element={<Magnetism />} /> {/* New Route */}
      <Route path="/physics/grade9/motion-speed" element={<MotionSpeed />} /> {/* New Route */}
      <Route path="/physics/grade9/newtons-laws" element={<Newtons />} /> {/* New Route */}
      <Route path="/physics/grade9/sound" element={<Sound />} /> {/* New Route */}
      <Route path="/physics/grade9/work-energy-power" element={<WEP />} /> {/* New Route */}

      <Route path="/labs/grade9/Chemistry" element={<Chemistry />} /> {/* New Route */}
      <Route path="/chemistry/grade9/lab-safety" element={<LabSafety />} /> {/* New Route */}
      <Route path="/chemistry/grade9/acids-bases" element={<AcidsBases />} /> {/* New Route */}
      <Route path="/chemistry/grade9/elements-compounds" element={<ECM />} /> {/* New Route */}
      <Route path="/chemistry/grade9/indicators" element={<Indicators />} /> {/* New Route */}
      <Route path="/chemistry/grade9/law-conservation-mass" element={<LawConservationMass />} /> {/* New Route */}
      <Route path="/chemistry/grade9/states-of-matter" element={<MatterState />} /> {/* New Route */}
      <Route path="/chemistry/grade9/separation-techniques" element={<MixturesSeparation />} /> {/* New Route */}
      <Route path="/chemistry/grade9/physical-chemical-changes" element={<PhysicalChemicalChanges />} /> {/* New Route */}
      <Route path="/chemistry/grade9/metals-acids" element={<ReactionMetalswAcids />} /> {/* New Route */}
      <Route path="/chemistry/grade9/rusting" element={<RustingIron />} /> {/* New Route */}

      <Route path="/labs/grade9/Biology" element={<Biology />} /> 
      <Route path="/biology/grade9/diffusion" element={<Diffusion />} /> 
      <Route path="/biology/grade9/microorganisms" element={<Microorganisms />} /> 
      <Route path="/biology/grade9/microscope-use" element={<MicroscopeUse />} /> 
      <Route path="/biology/grade9/osmosis" element={<Osmosis />} /> 
      <Route path="/biology/grade9/photosynthesis" element={<Photosynthesis />} /> 
      <Route path="/biology/grade9/plant-cells" element={<PlantCells />} /> 
      <Route path="/biology/grade9/respiration" element={<Respiration />} /> 
      <Route path="/biology/grade9/seed-germination" element={<SeedGermination />} />  
      <Route path="/biology/grade9/starch-test" element={<StarchTest />} />  
      
      <Route path="/labs/grade9/Maths" element={<Maths />} /> {/* New Route */}
      <Route path="/maths/grade9/number-systems" element={<NumberSystems />} /> {/* New Route */}
      <Route path="/maths/grade9/algebraic-expressions" element={<AlgebraicExpressions />} /> {/* New Route */}
      <Route path="/maths/grade9/coordinate-geometry" element={<CoordinateGeometry />} /> {/* New Route */}
      <Route path="/maths/grade9/exponents-powers" element={<ExponentsPowers />} /> {/* New Route */}
      <Route path="/maths/grade9/geometry" element={<GeometryMeasurements />} /> {/* New Route */}
      <Route path="/maths/grade9/irrational-numbers" element={<IrrationalNumbers />} /> {/* New Route */}
      <Route path="/maths/grade9/linear-equations" element={<LinearEquations />} /> {/* New Route */}
      <Route path="/maths/grade9/polynomials" element={<Polynomials />} /> {/* New Route */}
      <Route path="/maths/grade9/profit-loss" element={<ProfitLoss />} /> {/* New Route */}

      <Route path="/labs/grade9/ICT" element={<ICT />} /> {/* New Route */}
      <Route path="/ict/grade9/typing-speed-test" element={<TypingSpeed />} /> {/* New Route */}
      <Route path="/ict/grade9/email-simulator" element={<EmailSimulator />} /> {/* New Route */}
      <Route path="/ict/grade9/file-management" element={<FileManagement />} /> {/* New Route */}
      <Route path="/ict/grade9/internet-safety" element={<InternetSafety />} /> {/* New Route */}
      <Route path="/ict/grade9/networking-basics" element={<Networking />} /> {/* New Route */}
      <Route path="/ict/grade9/basic-programming" element={<Programming />} /> {/* New Route */}
      {/* grade 10 */}
      <Route path="/labs/grade10/Chemistry" element={<Chemistryten />} /> {/* New Route */}
      <Route path="/chemistry/grade10/phindicators" element={<PHIndicators />} />
      <Route path="/chemistry/grade10/acids-bases" element={<AcidsBasesG10 />} /> {/* New Route */}
      <Route path="/chemistry/grade10/balancing-equations" element={<BalancingChemical />} /> {/* New Route */}
      <Route path="/chemistry/grade10/chemical-bonding" element={<ChemicalBonding />} /> {/* New Route */}
      <Route path="/chemistry/grade10/reactions-types" element={<ChemicalReactions />} /> {/* New Route */}
      <Route path="/chemistry/grade10/combustion" element={<Combustion />} /> {/* New Route */}
      <Route path="/chemistry/grade10/metals-reactivity" element={<MetalReactivity />} /> {/* New Route */}
      <Route path="/chemistry/grade10/periodic-table" element={<PeriodicTable />} /> {/* New Route */}
      <Route path="/chemistry/grade10/rusting" element={<RustingCorrosion />} /> {/* New Route */}
      <Route path="/chemistry/grade10/thermal-decomposition" element={<ThermalDecomposition />} /> {/* New Route */}
      {/* <Route path="/chemistry/grade10/phindicators" element={<pHIndicators />} /> New Route */}

      <Route path="/labs/grade10/Biology" element={<Biologyten />} /> {/* New Route */}
      <Route path="/biology/grade10/animal-cells" element={<AnimalCell />} /> {/* New Route */}
      <Route path="/biology/grade10/blood-components" element={<BloodComponents />} /> {/* New Route */}
      <Route path="/biology/grade10/light-effect" element={<EffectLight />} /> {/* New Route */}
      <Route path="/biology/grade10/enzyme-activity" element={<EnzymeActivity />} /> {/* New Route */}
      <Route path="/biology/grade10/leaf-structure" element={<LeafStructure />} /> {/* New Route */}
      <Route path="/biology/grade10/photosynthesis" element={<Photosynthesisg10 />} /> {/* New Route */}
      <Route path="/biology/grade10/plant-hormones" element={<PlantHormones />} /> {/* New Route */}
      <Route path="/biology/grade10/respiration" element={<RespirationG10 />} /> {/* New Route */}
      <Route path="/biology/grade10/transpiration" element={<Transpiration />} /> {/* New Route */}

      <Route path="/labs/grade10/Maths" element={<Mathsten />} /> {/* New Route */}

      <Route path="/labs/grade10/ICT" element={<ICTten />} /> {/* New Route */}
      <Route path="/ict/grade10/cyber-security" element={<CyberSecurity />} /> {/* New Route */}
      <Route path="/ict/grade10/database-basics" element={<DatabaseBasics />} /> {/* New Route */}
      <Route path="/ict/grade10/network-topology" element={<NetworkTopology />} /> {/* New Route */}
      <Route path="/ict/grade10/programming-fundamentals" element={<ProgrammingFundamentals />} /> {/* New Route */}
      <Route path="/ict/grade10/web-design" element={<WebDesign />} /> {/* New Route */}

      <Route path="/labs/grade10/physics" element={<PhysicsTen />} /> {/* New Route */}
      <Route path="/physics/grade10/electricity" element={<Electricityten />} /> {/* New Route */}
      <Route path="/physics/grade10/heat-thermodynamics" element={<HeatThermodynamics />} /> {/* New Route */}
      <Route path="/physics/grade10/light-optics" element={<Light />} /> {/* New Route */}
      <Route path="/physics/grade10/magnetism" element={<MagnetismElectromagnetism />} /> {/* New Route */}
      <Route path="/physics/grade10/motion-forces" element={<MotionForces />} /> {/* New Route */}
      {/* <Route path="/labs/grade10/physics" element={<MotionForces />} /> */}
      <Route path="/physics/grade10/OhmsLaw" element={<OhmsLaw />} />  
      <Route path="/physics/grade10/practical-electronics" element={<PracticalElectronics />} /> {/* New Route */}
      <Route path="/physics/grade10/sound-waves" element={<SoundWaves />} /> {/* New Route */}
      <Route path="/physics/grade10/static-electricity" element={<StaticElectricity />} /> {/* New Route */}
      <Route path="/physics/grade10/work-energy-power" element={<WEPTEN />} /> {/* New Route */}
      {/* garde 11 */}
      <Route path="/labs/grade11/physics" element={<Physicseleven />} /> {/* New Route */}
      <Route path="/labs/grade11/Chemistry" element={<Chemistryeleven />} /> {/* New Route */}
      <Route path="/labs/grade11/Biology" element={<Biologyeleven />} /> {/* New Route */}
      <Route path="/labs/grade11/Maths" element={<Mathseleven />} /> {/* New Route */}
      <Route path="/labs/grade11/ICT" element={<ICTeleven />} /> {/* New Route */}
      <Route path="/labs/grade11/Drawing" element={<Drawingeleven />} /> {/* New Route */}
      {/* grade 12 */}
      <Route path="/labs/grade12/physics" element={<PhysicsTweelve />} /> {/* New Route */}
      <Route path="/labs/grade12/Chemistry" element={<ChemistryTweelve />} /> {/* New Route */}
      <Route path="/labs/grade12/Biology" element={<BiologyTweelve />} /> {/* New Route */}
      <Route path="/labs/grade12/Maths" element={<MathsTweelve />} /> {/* New Route */}
      <Route path="/labs/grade12/ICT" element={<ICTTweelve />} /> {/* New Route */}
      <Route path="/labs/grade12/Drawing" element={<DrawingTweelve />} /> {/* New Route */}
      {/*  */}

    </Routes>
>>>>>>> bd54ca401b791b86eb68a35b53f93e6042358bf1
  );
};

export default LabRouter;
