import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder } from "@babylonjs/core";

import "@babylonjs/loaders";

const types = [
  { label: "Cocci", type: "cocci", color: "#f44336" },
  { label: "Bacilli", type: "bacilli", color: "#2196f3" },
  { label: "Spirilla", type: "spirilla", color: "#4caf50" },
  { label: "Yeast (budding)", type: "yeast", color: "#ff9800" },
  { label: "Protist (paramecium)", type: "protist", color: "#9c27b0" },
  { label: "Mold (hyphae)", type: "mold", color: "#795548" },
  { label: "Volvox (algae colony)", type: "volvox", color: "#00bcd4" },
  { label: "Amoeba (blob)", type: "amoeba", color: "#9e9e9e" },
];

const Microorganisms = () => {
  const canvasRef = useRef(null);
  const [selected, setSelected] = useState(types[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.95, 0.95, 0.98, 1);

    const camera = new BABYLON.ArcRotateCamera("cam", -Math.PI/2, Math.PI/3, 8, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    BABYLON.MeshBuilder.CreateGround("slide", {width: 6, height: 6}, scene);

    const microbes = [];
    for (let i = 0; i < 12; i++) {
      const posX = (Math.random() - 0.5)*4;
      const posZ = (Math.random() - 0.5)*4;
      let mesh;
      const mat = new BABYLON.StandardMaterial("mat"+i, scene);
      mat.diffuseColor = BABYLON.Color3.FromHexString(selected.color);

      switch (selected.type) {
        case "cocci":
          mesh = BABYLON.MeshBuilder.CreateSphere("cocci"+i, { diameter: 0.4 }, scene);
          break;
        case "bacilli":
          mesh = BABYLON.MeshBuilder.CreateCylinder("bacilli"+i, {height:1, diameter:0.3}, scene);
          mesh.rotation.z = Math.random()*Math.PI;
          break;
        case "spirilla":
          mesh = BABYLON.MeshBuilder.CreateTorusKnot("spirilla"+i, {radius:0.35, tube:0.1}, scene);
          break;
        case "yeast":
          mesh = BABYLON.MeshBuilder.CreateSphere("yeast"+i, {diameter:0.5}, scene);
          const bud = BABYLON.MeshBuilder.CreateSphere("bud"+i, {diameter:0.25}, scene);
          bud.parent = mesh;
          bud.position.x = 0.4;
          break;
        case "protist":
          mesh = BABYLON.MeshBuilder.CreateBox("protist"+i, {width:0.7, depth:0.4, height:0.3}, scene);
          mesh.scaling.x = 1.5;
          mesh.rotation.y = Math.random()*Math.PI;
          break;
        case "mold":
          const seg = MeshBuilder.CreateCylinder(`hypha${i}`, {height:2, diameter:0.1}, scene);
          const branch = MeshBuilder.CreateCylinder(`branch${i}`, {height:1, diameter:0.1}, scene);
          branch.position = new BABYLON.Vector3(0,1,0.3);
          mesh = new BABYLON.Mesh("hypha_group"+i, scene);
          seg.parent = mesh; branch.parent = mesh;
          mesh = mesh;
          break;
        case "volvox":
          mesh = BABYLON.MeshBuilder.CreateSphere("volvox"+i, {diameter:1}, scene);
          for(let j=0;j<6;j++){
            const bead = BABYLON.MeshBuilder.CreateSphere(`bead${i}${j}`, {diameter:0.2}, scene);
            bead.parent = mesh;
            const angle = j*(Math.PI*2/6);
            bead.position = new BABYLON.Vector3(Math.cos(angle)*0.6,0,Math.sin(angle)*0.6);
          }
          break;
        case "amoeba":
          mesh = BABYLON.MeshBuilder.CreateSphere("amoeba"+i, {diameter:0.8}, scene);
          mesh.scaling = new BABYLON.Vector3(1,0.7,1.2);
          break;
      }

      mesh.material = mat;
      mesh.position = new BABYLON.Vector3(posX,0.2,posZ);
      microbes.push(mesh);
    }

    scene.registerBeforeRender(() => microbes.forEach(m=>m.rotation.y += 0.008));

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());
    setLoading(false);

    return () => engine.dispose();
  }, [selected]);

  return (
    <div style={{ padding:20, maxWidth:960, margin:"auto", fontFamily:"Segoe UI, sans-serif" }}>
      <h1 style={{textAlign:"center"}}>Observing Microorganisms Lab Ethiopia</h1>
      <div style={{textAlign:"center", margin:"20px 0"}}>
        {types.map(t=>(
          <button key={t.type}
            onClick={()=>{ setSelected(t); setLoading(true); }}
            style={{
              margin:4,padding:"8px 16px",
              backgroundColor: selected.type===t.type?"#1976d2":"#ddd",
              color: selected.type===t.type?"#fff":"#000",
              borderRadius:4,cursor:"pointer"
            }}>{t.label}</button>
        ))}
      </div>
      <div style={{border:"2px solid #ccc",height:500,borderRadius:6,overflow:"hidden"}}>
        {loading && <p style={{textAlign:"center",padding:16}}>Loading simulation...</p>}
        <canvas ref={canvasRef} style={{width:"100%",height:"100%"}}/>
      </div>
      <section style={{marginTop:32}}>
        <h2>Instructions</h2>
        <ol>
          <li>Select type above.</li>
          <li>Drag to rotate camera.</li>
          <li>Scroll to zoom.</li>
        </ol>
      </section>
      <section style={{marginTop:24}}>
        <h2>Microbe Types Explained</h2>
        <ul>
          <li><strong>Cocci</strong> – spherical bacteria.</li>
          <li><strong>Bacilli</strong> – rod-shaped bacteria.</li>
          <li><strong>Spirilla</strong> – spiral bacteria.</li>
          <li><strong>Yeast</strong> – budding fungus cells.</li>
          <li><strong>Protist</strong> – simulated paramecium shape.</li>
          <li><strong>Mold</strong> – hyphal branching filaments.</li>
          <li><strong>Volvox</strong> – colonial algae model.</li>
          <li><strong>Amoeba</strong> – amoeboid irregular shape.</li>
        </ul>
      </section>
      <nav style={{marginTop:30,display:"flex",justifyContent:"center",gap:20}}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/biology">Biology Labs</NavLink>
        <NavLink to="/microorganisms">Microorganisms Lab</NavLink>
      </nav>
    </div>
  );
};

export default Microorganisms;
