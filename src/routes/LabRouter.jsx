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
  );
};

export default LabRouter;
