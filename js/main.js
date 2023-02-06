document.querySelector("#dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDarkMode = document.body.classList.contains("dark");
  localStorage.setItem("darkmode", isDarkMode);
  main_color = isDarkMode == true ? "#ff5110" : "#00aeef";
  // chang mobile status bar color
  document
    .querySelector('meta[name="theme-color"')
    .setAttribute("content", isDarkMode ? "#1a1a2e" : "#fff");
  updateGraph(document.querySelector(".line").classList.contains("open"));
});
let isDarkMode = localStorage.getItem("darkmode");
let main_color = "#00aeef";
if (isDarkMode == "true") {
  document.body.classList.add("dark");
  document
    .querySelector('meta[name="theme-color"')
    .setAttribute("content", "#000");
  main_color = "#ff5110";
}
window.onload = function () {
  document.querySelector(".anime").classList.remove("active");
};
// start varible of app
let typeOfSerie = document.querySelector("#typeOfSerie").value;
let N;
let xi = [],
  ni = [],
  Ni = [],
  fi = [],
  Fi = [],
  NTotat = [];
let continu = {
  li: [],
  li_1: [],
  ci: [],
  di: [],
  a: [],
  k: 0,
  table: [],
  aG: 0,
};
let variable2 = {
  xi: [],
  yi: [],
  xiContinu: {
    li: [],
    li_1: [],
    ci: [],
    di: [],
    a: [],
    k: 0,
    table: [],
    aG: 0,
  },
  yiContinu: {
    li: [],
    li_1: [],
    ci: [],
    di: [],
    a: [],
    k: 0,
    table: [],
    aG: 0,
  },
};
let X, Xq, md, mdLO, Me; // Parameters de position
let e, Q1, Q2, Q3, R, varX; // Parameters de dispersion
let Cp, Cy; // Parameters de dispersion

// end varible of app
// start etap
let addSerie = document.querySelector(".addSerie");
let etapDiv = document.querySelector(".etaps");
let etaps = document.querySelectorAll(".etaps .etap");
let closEtap = document.querySelector(".closEtap");
let btnNextEtap = document.querySelector(".btnNextEtap");
let SizeOfSerie = document.querySelector("#SizeOfSerie");
let NtotalInput = document.querySelector("#Ntotal");
let Nclass = document.querySelector("#Nclass");
let eletOfSerie = document.querySelectorAll(".elmenetOfSerie input");
let content = document.querySelectorAll(".para .content");
let btncontent = document.querySelectorAll(".para .btn1");
let etapN;
document.querySelector("#typeOfSerie").oninput = function ({ target: e }) {
  typeOfSerie = e.value;
  let text = document.querySelector(".textChange1");
  if (typeOfSerie == "C") {
    text.innerHTML = "Nomber of class";
    document.querySelector(".Nclass").classList.remove("open");
    document.querySelector(".XYcalss").classList.remove("open");
    document.querySelector(".elmenetOfSerie").style.display = "block";
  } else if (typeOfSerie == "D") {
    text.innerHTML = "Size Of Serie Statistique :";
    document.querySelector(".Nclass").classList.remove("open");
    document.querySelector(".XYcalss").classList.remove("open");
    document.querySelector(".elmenetOfSerie").style.display = "block";
  } else if (typeOfSerie == "DToC") {
    text.innerHTML = "Size Of Serie Statistique :";
    document.querySelector(".Nclass").classList.add("open");
    document.querySelector(".XYcalss").classList.remove("open");
    document.querySelector(".elmenetOfSerie").style.display = "block";
  } else if (typeOfSerie == "2V") {
    text.innerHTML = "Size Of Serie Statistique :";
    document.querySelector(".Nclass").classList.remove("open");
    document.querySelector(".XYcalss").classList.add("open");
    document.querySelector(".elmenetOfSerie").style.display = "none";
    NtotalInput.parentElement.classList.remove("open");
    document.querySelector(".casNon").classList.remove("open");
  }
};
addSerie.onclick = function () {
  etapDiv.classList.add("open");
  etaps[0].style.display = "flex";
  etapN = 1;
  for (let i = 0; i < btncontent.length; i++) {
    btncontent[i].classList.remove("active");
    content[i].classList.remove("open");
  }
};
closEtap.onclick = function () {
  if (etapN == 1) {
    etapDiv.classList.remove("open");
    SizeOfSerie.classList.remove("active");
    NtotalInput.classList.remove("active");
    avanEtap(1);
  }
  if (etapN == 2) {
    avanEtap(2);
  }
};
SizeOfSerie.oninput = function () {
  SizeOfSerie.classList.remove("active");
};
NtotalInput.oninput = function () {
  NtotalInput.classList.remove("active");
};
Nclass.oninput = function () {
  Nclass.classList.remove("active");
};
eletOfSerie[1].onclick = function () {
  NtotalInput.parentElement.classList.add("open");
  document.querySelector(".casNon").classList.remove("open");
};
eletOfSerie[0].onclick = function () {
  NtotalInput.parentElement.classList.remove("open");
  document.querySelector(".casNon").classList.remove("open");
};
eletOfSerie[2].onclick = function () {
  NtotalInput.parentElement.classList.remove("open");
  document.querySelector(".casNon").classList.add("open");
};
document.querySelector("#D").onclick = function () {
  document.querySelector("#Nclass").classList.add("stop");
  document.querySelector("#Nclass").setAttribute("readonly", "");
  document.querySelector("#Nclass").classList.remove("active");
  document.querySelector("#Nclass").value = "";
};
document.querySelector("#S").onclick = function () {
  document.querySelector("#Nclass").classList.remove("active");
  document.querySelector("#Nclass").classList.remove("stop");
  document.querySelector("#Nclass").removeAttribute("readonly");
};
btnNextEtap.onclick = function () {
  switch (etapN) {
    case 1:
      etap1();
      break;
    case 2:
      etap2();
      break;
  }
};
function etap1() {
  if (SizeOfSerie.value == 0) {
    SizeOfSerie.classList.add("active");
    SizeOfSerie.focus();
    return;
  }
  if (NtotalInput.value == 0 && eletOfSerie[1].checked == true) {
    NtotalInput.classList.add("active");
    NtotalInput.focus();
    return;
  }
  if (Nclass.value == 0 && document.querySelector("#S").checked == true) {
    Nclass.classList.add("active");
    Nclass.focus();
    return;
  }
  N = SizeOfSerie.value;
  nextEtap(1);
  updat();
  cerateEtap2();
}
addEventListener("keydown", function ({ key: e }) {
  if (e == "Enter") {
    if (etapN == 1) {
      etap1();
    }
  }
});
function cerateEtap2() {
  let ul = document.querySelectorAll(".etap2 ul");
  if (eletOfSerie[1].checked == true) {
    document.querySelector(".ele").innerHTML = "fi";
  } else {
    document.querySelector(".ele").innerHTML = "ni";
  }
  if (typeOfSerie == "D" || typeOfSerie == "DToC" || typeOfSerie == "C") {
    ul[0].style.display = "block";
    for (let i = 0; i < N; i++) {
      let li = document.createElement("li");
      li.innerHTML = i + 1;
      ul[0].appendChild(li);
    }
    ul[3].style.display = "none";
    for (let i = 0; i < N; i++) {
      let li = document.createElement("li");
      let inp = document.createElement("input");
      inp.setAttribute("type", "number");
      inp.setAttribute("min", 1);
      if (eletOfSerie[2].checked == true) {
        inp.value = 1;
        inp.setAttribute("readonly", "");
      }
      li.appendChild(inp);
      ul[2].appendChild(li);
    }
    ul[2].style.display = "block";
  } else {
    ul[0].style.display = "none";
    ul[3].style.display = "block";
    ul[2].style.display = "none";
  }
  if (typeOfSerie == "D" || typeOfSerie == "DToC") {
    for (let i = 0; i < N; i++) {
      let li = document.createElement("li");
      let inp = document.createElement("input");
      inp.setAttribute("type", "number");
      li.appendChild(inp);
      ul[1].appendChild(li);
    }
  } else if (typeOfSerie == "C") {
    for (let i = 0; i < N; i++) {
      let li = document.createElement("li");
      let inp = document.createElement("input");
      let inp2 = document.createElement("input");
      inp.setAttribute("type", "number");
      inp2.setAttribute("type", "number");
      inp.classList.add("li");
      inp2.classList.add("li_1");
      li.innerHTML = `[`;
      li.appendChild(inp);
      li.innerHTML += ",";
      li.appendChild(inp2);
      li.innerHTML += "[";
      li.classList.add("continu");
      ul[1].appendChild(li);
    }
  } else if (typeOfSerie == "2V") {
    let chick = chick_Type_Of_X_And_Y_Varyable();
    if (chick == 1) {
      for (let i = 0; i < N; i++) {
        let li = document.createElement("li");
        let inp = document.createElement("input");
        inp.setAttribute("type", "number");
        li.appendChild(inp);
        ul[1].appendChild(li);
      }
      for (let i = 0; i < N; i++) {
        let li = document.createElement("li");
        let inp = document.createElement("input");
        inp.setAttribute("type", "number");
        li.appendChild(inp);
        ul[3].appendChild(li);
      }
    } else if (chick == 0) {
      for (let i = 0; i < N; i++) {
        let li = document.createElement("li");
        let inp = document.createElement("input");
        let inp2 = document.createElement("input");
        inp.setAttribute("type", "number");
        inp2.setAttribute("type", "number");
        inp.classList.add("li");
        inp2.classList.add("li_1");
        li.innerHTML = `[`;
        li.appendChild(inp);
        li.innerHTML += ",";
        li.appendChild(inp2);
        li.innerHTML += "[";
        li.classList.add("continu");
        ul[1].appendChild(li);
      }
      for (let i = 0; i < N; i++) {
        let li = document.createElement("li");
        let inp = document.createElement("input");
        let inp2 = document.createElement("input");
        inp.setAttribute("type", "number");
        inp2.setAttribute("type", "number");
        inp.classList.add("li");
        inp2.classList.add("li_1");
        li.innerHTML = `[`;
        li.appendChild(inp);
        li.innerHTML += ",";
        li.appendChild(inp2);
        li.innerHTML += "[";
        li.classList.add("continu");
        ul[3].appendChild(li);
      }
    }
  }
  /////
  ulEnter = document.querySelectorAll(".etap2 .ulEnter input");
  ulEnter[0].focus();
  let chick = chick_Type_Of_X_And_Y_Varyable();
  ulEnter.forEach(function (ele, i, arr) {
    ele.addEventListener("keydown", function ({ key: e }) {
      if (e == "Enter") {
        if (arr[i + 1] != undefined) arr[i + 1].focus();
        if (
          (((i > N * 2 - 2 && typeOfSerie != "C") ||
            (i > N * 3 - 2 &&
              typeOfSerie == "C" &&
              eletOfSerie[2].checked == false) ||
            (i > N * 2 - 2 &&
              typeOfSerie == "C" &&
              eletOfSerie[2].checked == true) ||
            (i > N - 2 &&
              eletOfSerie[2].checked == true &&
              typeOfSerie != "C")) &&
            typeOfSerie != "2V") ||
          (typeOfSerie == "2V" && chick != 1 && i > N * 4 - 2) ||
          (typeOfSerie == "2V" && chick == 1 && i > N * 2 - 2)
        ) {
          btnNextEtap.click();
        }
      }
    });
    if (ele.className.search("li_1") != -1 && i != N * 4 - 1) {
      ele.addEventListener("input", function () {
        if (arr[i + 1].className.search("li") != -1 && i + 1 != N * 2) {
          arr[i + 1].value = ele.value;
          ele.addEventListener("keydown", function ({ key: e }) {
            if (e == "Enter") {
              if (arr[i + 1] != undefined) arr[i + 2].focus();
            }
          });
        }
      });
    }
  });
}

function etap2() {
  updat();
  let xiInput = document.querySelectorAll(".xiUL li input");
  let niInput = document.querySelectorAll(".niUL li input");
  if (chicketap2(xiInput) == 1 && chicketap2(niInput) == 1) {
    if (chickRepet(xiInput) == 1) {
      if (typeOfSerie == "D" || typeOfSerie == "DToC") {
        pusArray(xiInput, xi);
      } else if (typeOfSerie == "C") {
        let li = document.querySelectorAll(".xiUL li .li");
        let li_1 = document.querySelectorAll(".xiUL li .li_1");
        pusArrayContine(li, li_1, continu);
      } else if (typeOfSerie == "2V") {
        let yiInput = document.querySelectorAll(".yiUL li input");
        let chick = chick_Type_Of_X_And_Y_Varyable();
        if (chick == 1) {
          pusArray(xiInput, variable2.xi);
          pusArray(yiInput, variable2.yi);
        } else if (chick == 0) {
          let Xli = document.querySelectorAll(".xiUL li .li");
          let Xli_1 = document.querySelectorAll(".xiUL li .li_1");
          let Yli = document.querySelectorAll(".yiUL li .li");
          let Yli_1 = document.querySelectorAll(".yiUL li .li_1");
          pusArrayContine(Xli, Xli_1, variable2.xiContinu);
          pusArrayContine(Yli, Yli_1, variable2.yiContinu);
        }
      }
      if (eletOfSerie[0].checked == true || eletOfSerie[2].checked == true) {
        pusArray(niInput, ni);

        //nomber total des effctif
        NTotat = somme(ni);
        //calcl le Fréquence normal
        for (let i = 0; i < N; i++) {
          fi[i] = ni[i] / NTotat;
        }
      } else {
        pusArray(niInput, fi);
        //nomber total des effctif
        NTotat = Number(NtotalInput.value);
        //calcl le Effectif normal
        for (let i = 0; i < N; i++) {
          ni[i] = fi[i] * NTotat;
        }
      }
      nextEtap(2);
      etap3clc(typeOfSerie);
    }
  }
}
function chicketap2(el) {
  let valide = 1;
  let a = [];
  el.forEach(function (e, i, r) {
    e.removeAttribute("placeholder");
    if (e.value == "") {
      e.setAttribute("placeholder", "required");
      a.push(e);
      a[0].focus();
      valide = 0;
    }
  });
  return valide;
}
function chickRepet(el) {
  let valide = 1;
  if (typeOfSerie == "D" || typeOfSerie == "DToC") {
    RemoveChickRepet(el);
    for (let i = 0; i < el.length; i++) {
      let e = el[i];
      for (let j = 0; j < el.length; j++) {
        if (e.value == el[j].value && i != j && valide == 1) {
          el[j].classList.add("active");
          e.classList.add("active");
          e.focus();
          valide = 0;
        }
      }
    }
  }
  return valide;
}
function RemoveChickRepet(el) {
  el.forEach(function (e) {
    e.addEventListener("input", function (i) {
      el.forEach(function (i) {
        i.classList.remove("active");
      });
    });
  });
}
function chick_Type_Of_X_And_Y_Varyable() {
  let V = document.querySelectorAll(".XYcalss input");
  if (V[0].checked == true && V[2].checked == true) {
    return 1;
  } else if (V[0].checked == true && V[2].checked == false) {
    return "X";
  } else if (V[0].checked == false && V[2].checked == true) {
    return "Y";
  } else {
    return 0;
  }
}
function etap3clc(chick) {
  //calc les Effectifs comule
  sommeComuleArray(ni, Ni);
  //calc les Fréquence comule
  sommeComuleArray(fi, Fi);
  if (chick == "D") {
    // start clcl les Parameters de position
    mdLO = maxInArray(ni, N);
    for (let j = 0; j < N; j++) {
      if (ni[j] == mdLO) {
        md = xi[j];
      }
    }
    X = moyen_whith_os_of_arg2(fi, xi, 1);
    Xq = moyen_whith_os_of_arg2(fi, xi, 2);
    Me = parti_of_arry(xi, Fi, 0.5);
    // end clcl les Parameters de position
    // start clcl les Parameters de dispersion
    e = maxInArray(xi, N) - minInArray(xi, N);
    Q1 = parti_of_arry(xi, Fi, 0.25, N);
    Q2 = parti_of_arry(xi, Fi, 0.5, N);
    Q3 = parti_of_arry(xi, Fi, 0.75, N);
    R = Q3 - Q1;
    varX = Xq - Math.pow(X, 2);
    // end clcl les Parameters de dispersion
    // start clcl les Parameters de forme
    Cp = (X - md) / Math.sqrt(varX);
    Cy = R != 0 ? (Q1 + Q3 - 2 * Me) / R : 0;
    // end clcl les Parameters de forme
  } else if (chick == "C") {
    // start calc le center
    continu.ci = [];
    for (let i = 0; i < N; i++) {
      continu.ci[i] = (continu.li[i] + continu.li_1[i]) / 2;
    }
    // end calc le center
    // start clc table
    continu.table = [];
    for (let i = 0; i < N; i++) {
      continu.table.push(`[${continu.li[i]},${continu.li_1[i]}[`);
    }
    //end clc table
    // start calc le pas
    continu.a = [];
    for (let i = 0; i < N; i++) {
      continu.a[i] = Number((continu.li_1[i] - continu.li[i]).toFixed(2));
    }
    // end calc le pas
    //start clc densité
    continu.di = [];
    if (chickAmplitude(continu.a) == 0) {
      for (let i = 0; i < N; i++) {
        continu.di[i] = ni[i] / continu.a[i];
      }
    }
    //end clc densité
    // start clcl les Parameters de position
    if (chickAmplitude(continu.a) == 1) {
      mdLO = maxInArray(ni, N);
    } else {
      mdLO = maxInArray(continu.di, N);
    }
    for (let j = 0; j < N; j++) {
      let d1, d2;
      if (chickAmplitude(continu.a) == 1 && ni[j] == mdLO) {
        d1 = ni[j] - ni[j - 1];
        d2 = ni[j] - ni[j + 1];
        md = continu.li[j] + (d1 / (d1 + d2)) * continu.a[j];
      } else if (chickAmplitude(continu.a) != 1 && continu.di[j] == mdLO) {
        d1 = continu.di[j] - continu.di[j - 1];
        d2 = continu.di[j] - continu.di[j + 1];
        md = continu.li[j] + (d1 / (d1 + d2)) * continu.a[j];
      }
    }
    X = moyen_whith_os_of_arg2(fi, continu.ci, 1);
    Xq = moyen_whith_os_of_arg2(fi, continu.ci, 2);
    Me = partiContinu(continu, Fi, 0.5);
    // end clcl les Parameters de position
    // start clcl les Parameters de dispersion
    e = continu.li_1[N - 1] - continu.li[0];
    Q1 = partiContinu(continu, Fi, 0.25);
    Q2 = partiContinu(continu, Fi, 0.5);
    Q3 = partiContinu(continu, Fi, 0.75);
    R = Q3 - Q1;
    varX = Xq - Math.pow(X, 2);
    // end clcl les Parameters de dispersion
    // start clcl les Parameters de forme
    Cp = (X - md) / Math.sqrt(varX);
    Cy = R != 0 ? (Q1 + Q3 - 2 * Me) / R : 0;
    // end clcl les Parameters de forme
  } else if (chick == "DToC") {
    if (document.querySelector("#S").checked == true) {
      continu.k = Nclass.value;
    } else {
      continu.k = Math.ceil(2.5 * Math.pow(NTotat, 1 / 4));
    }
    N = continu.k;
    continu.aG = Number(
      ((maxInArray(xi) - minInArray(xi)) / continu.k).toFixed(2)
    );
    continu.li[0] = xi[0];
    for (let i = 0; i < N; i++) {
      continu.li_1[i] = Number((continu.li[i] + continu.aG).toFixed(2));
      if (i + 1 != N) {
        continu.li[i + 1] = continu.li_1[i];
      }
    }
    let niCopy = ni;
    ni = [];
    for (let i = 0; i < N; i++) {
      ni.push(0);
    }
    for (let j = 0; j < xi.length; j++) {
      for (let i = 0; i < N - 1; i++) {
        if (xi[j] >= continu.li[i] && xi[j] < continu.li_1[i]) {
          ni[i] += niCopy[j];
          break;
        }
      }
      if (xi[j] >= continu.li[N - 1] && xi[j] <= continu.li_1[N - 1]) {
        ni[N - 1] += niCopy[j];
      }
    }
    fi = [];
    for (let i = 0; i < N; i++) {
      fi[i] = ni[i] / NTotat;
    }
    etap3clc("C");
  }
  cerateAffich(chick);
}
function cerateAffich(chick) {
  let anime = document.querySelector(".anime");
  let forme = document.querySelector(".paraforme");
  anime.classList.add("active");
  document.querySelector(".etap3").style.display = "block";
  addSerie.parentElement.classList.add("notFull");
  let info = document.querySelector(".info");
  info.innerHTML = `
    Type Of Serie Statistique : ${chick == "D" ? "Discrète" : "Continue"} <br>
    Number total Of Effectif: ${NTotat} 
  `;
  document.querySelector(".mostache").classList.remove("open");
  if (chick == "D") {
    forme.style.display = "block";
    let ulhead = document.querySelector(".head");
    ulhead.innerHTML = `<li>xi</li><li>ni</li><li>Ni</li><li>fi</li><li>Fi</li>`;
    document.querySelector(".para").classList.add("open");
    let ulTd = document.querySelector(".td");
    ulTd.innerHTML = "";
    for (let i = 0; i < N; i++) {
      let ul = document.createElement("ul");
      ulTd.appendChild(ul);
      for (let j = 0; j < 5; j++) {
        let li = document.createElement("li");
        let a = [xi, ni, Ni, fi, Fi];
        if (Number.isInteger(a[j][i])) {
          li.innerHTML = a[j][i];
        } else {
          li.innerHTML = a[j][i].toFixed(2);
        }
        ul.appendChild(li);
      }
    }
    content[2].innerHTML = `
      Cy = ${Cy.toFixed(2)}<br>
      Cp = ${Cp.toFixed(2)}<br>
      la distrbution est ${chickDistrbution()}
    `;
    let ys = [0]; // ys bigin at 0
    ys.push(...Fi);
    let xs = [0]; // ys bigin at 0
    xs.push(...xi);
    courbe(xs, ys);
    hestograme(xi, fi, 0);
    moustache(dataXi(), Q1, Q2, Q3);
    moustache(dataXi(), Q1, Q2, Q3);
  }
  if (chick == "C") {
    forme.style.display = "none";
    let ulhead = document.querySelector(".head");
    if (chickAmplitude(continu.a) == 1) {
      ulhead.innerHTML = `<li>xi</li><li>ci</li><li>ni</li><li>Ni</li><li>fi</li><li>Fi</li>`;
    } else {
      ulhead.innerHTML = `<li>xi</li><li>ci</li><li>ni</li><li>Ni</li><li>fi</li><li>Fi</li><li>di</li>`;
    }
    document.querySelector(".para").classList.add("open");
    let ulTd = document.querySelector(".td");
    ulTd.innerHTML = "";
    for (let i = 0; i < N; i++) {
      let ul = document.createElement("ul");
      ulTd.appendChild(ul);
      let a = [];
      if (chickAmplitude(continu.a) == 1) {
        a = [continu.table, continu.ci, ni, Ni, fi, Fi];
      } else {
        a = [continu.table, continu.ci, ni, Ni, fi, Fi, continu.di];
      }
      for (let j = 0; j < a.length; j++) {
        let li = document.createElement("li");

        if (Number.isInteger(a[j][i])) {
          li.innerHTML = a[j][i];
        } else if (typeof a[j][i] == "number") {
          li.innerHTML = a[j][i].toFixed(2);
        } else {
          li.innerHTML = a[j][i];
        }
        ul.appendChild(li);
      }
    }
    let xs = [0]; //xs bigin at 0
    for (let i = 0; i < N; i++) {
      xs.push(continu.li[i]);
      xs.push(continu.li_1[i]);
    }
    let mySet = new Set(xs);
    xs = [...mySet];
    let ys = [0, 0]; // ys bigin at 0
    ys.push(...Fi);
    courbe(xs, ys);
    // /** start hesto */
    // xs = []; //xs bigin at 0
    // for (let i = 0; i < N; i++) {
    //   xs.push(continu.li[i]);
    //   xs.push(continu.li_1[i]);
    // }
    // mySet = new Set(xs);
    // xs = [...mySet];
    // ys = [0]; // ys bigin at 0
    // ys.push(...fi);
    hestograme(continu.table, fi, 1);
  }
  if (chick == "C" || chick == "D") {
    content[0].innerHTML = `Mode md = ${mdFunction(chick)} <br>
      Moyenne Arithmetique X = ${X.toFixed(2)} <br>
      Moyenne Quadratique Xq = ${Xq.toFixed(2)} <br>
      Me = ${Me.toFixed(2)} <br>
      Min(xi) = ${minInArray(
        chick == "D" ? xi : continu.li
      )} , Max(xi) = ${maxInArray(chick == "D" ? xi : continu.li_1)} <br>
      Min(ni) = ${minInArray(ni)} , Max(ni) = ${maxInArray(ni)}`;
    content[1].innerHTML = `l'edendu e = ${e.toFixed(2)}<br>
      Q1 = ${Q1.toFixed(2)}<br>
      Q2 = ${Q2.toFixed(2)}<br>
      Q3 = ${Q3.toFixed(2)}<br>
      R(Q) = ${R.toFixed(2)}<br>
      var(X) = ${varX.toFixed(2)}<br>
      ecart-type a = ${Math.sqrt(varX).toFixed(2)}`;
  }
  updateGraph(1);
  setTimeout(function () {
    anime.classList.remove("active");
  }, 500);
}
btncontent.forEach(function (ele) {
  ele.addEventListener("click", function (e) {
    content[ele.dataset.aff].classList.toggle("open");
    ele.classList.toggle("active");
  });
});
// end etap

// start function
function dataXi() {
  let data = [];
  for (let i = 0; i < xi.length; i++) {
    for (let j = 0; j < ni[i]; j++) {
      data.push(xi[i]);
    }
  }
  return data;
}
function pusArray(S, R) {
  S.forEach(function (e) {
    R.push(Number(e.value));
  });
}
function pusArrayContine(li, li_1, R) {
  li.forEach(function (e) {
    R.li.push(Number(e.value));
  });
  li_1.forEach(function (e) {
    R.li_1.push(Number(e.value));
  });
}
function somme(arr) {
  let S = 0;
  for (let i = 0; i < N; i++) {
    S += Number(arr[i]);
  }
  return S;
}
function updat() {
  ni = [];
  xi = [];
  fi = [];
  Fi = [];
  Ni = [];
  continu.li = [];
  continu.li_1 = [];
  variable2.xi = [];
  variable2.yi = [];
  variable2.xiContinu.li = [];
  variable2.xiContinu.li_1 = [];
  variable2.yiContinu.li = [];
  variable2.yiContinu.li_1 = [];
}
function nextEtap(i) {
  i--;
  if (i != 1) etaps[i + 1].style.display = "flex";
  else {
    etapDiv.classList.remove("open");
    document.querySelectorAll(".etap2 ul li").forEach(function (e) {
      e.remove();
    });
    SizeOfSerie.value = "";
    NtotalInput.value = "";
  }
  etaps[i].style.display = "none";
  etapN = i + 2;
}
function avanEtap(i) {
  i--;
  if (i != 0) {
    document.querySelectorAll(".etap2 ul li").forEach(function (e) {
      e.remove();
    });
    etaps[i - 1].style.display = "flex";
  } else {
    SizeOfSerie.value = "";
    NtotalInput.value = "";
  }
  etaps[i].style.display = "none";
  etapN = i;
}
function sommeComuleArray(S, R) {
  // R[] est change;
  let con = (R[0] = S[0]);
  // calc eff ou Freq cumilu
  for (let i = 1; i < N; i++) {
    con += S[i];
    R[i] = con;
  }
}
function moyen_whith_os_of_arg2(t1, t2, os) {
  let s = 0;
  for (let i = 0; i < N; i++) {
    s += t1[i] * Math.pow(t2[i], os);
  }
  return s;
}
function parti_of_arry(t1, t2, nisba) {
  let tab = [];
  let j = 0;
  for (let i = 0; i < N; i++) {
    if (t2[i] >= nisba) tab[j++] = t2[i];
  }
  mi = minInArray(tab, j);
  for (let i = 0; i < N; i++) {
    if (t2[i] == mi) return t1[i];
  }
}
function maxInArray(t) {
  let max = t[0];
  for (let i = 0; i < t.length; i++) max = max < t[i] ? t[i] : max;
  return max;
}
function minInArray(t) {
  let min = t[0];
  for (let i = 0; i < t.length; i++) min = t[i] < min ? t[i] : min;
  return min;
}
function mdFunction(chick) {
  if (chick == "D") {
    let a = [];
    for (let j = 0; j < N; j++) {
      if (ni[j] == mdLO) {
        a.push(Number(xi[j].toFixed(2)));
      }
    }
    return a.length != N ? a.join(" et ") : "Pas de Mode";
  } else if (chick == "C") {
    return Number(md.toFixed(2));
  }
}
function chickDistrbution() {
  if (Cy == 0 && Cp == 0) return "symetrie";
  else if (Cy > 0 && Cp > 0) return "asymetrie a droite";
  else if (Cy < 0 && Cp < 0) return "asymetrie a gauche";
  else return "asymetrie";
}
function partiContinu(obj, t2, w) {
  for (let i = 0; i < N; i++) {
    if (t2[i] >= w) {
      let a = obj.li[i] + obj.a[i] * ((w - t2[i - 1]) / (t2[i] - t2[i - 1]));
      if (a != undefined && a != NaN) {
        return a;
      } else {
        return 0;
      }
    }
  }
}
function chickAmplitude(a) {
  let valide = 1;
  for (let i = 1; i < a.length; i++) {
    if (a[i] != a[i - 1]) {
      valide = 0;
    }
  }
  return valide;
}
//end function
// start function of Graphe
const ctxbar = document.getElementById("bar");
const bar = new Chart(ctxbar, {
  type: "bar",
  data: {
    datasets: [
      {
        label: "Fréquence fi",
        backgroundColor: main_color,
      },
    ],
  },
  options: {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        suggestedMax: maxInArray(fi) + 0.01,
        ticks: {
          maxTicksLimit: 15,
          font: {
            style: "italic",
          },
          color: "#000",
          callback: function (value) {
            return value + "%";
          },
        },
        grid: {
          display: true,
          offset: false,
        },
      },
      x: {
        // type: "linear",
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 25,
          font: {
            style: "italic",
          },
          color: "#000",
        },
      },
    },
  },
});
const ctxline = document.getElementById("line");
const line = new Chart(ctxline, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Fréquence Fi",
        backgroundColor: main_color,
        tension: 0.1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 15,
          font: {
            style: "italic",
          },
          color: "#000",
          callback: function (value) {
            return value + "%";
          },
        },
        grid: {
          display: true,
          offset: false,
        },
        type: "linear",
      },
      x: {
        beginAtZero: true,
        type: "linear",
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 25,
          font: {
            style: "italic",
          },
          color: "#000",
        },
      },
    },
  },
});
async function hestograme(x, y, contine) {
  document.querySelector(".bar").classList.add("open");
  bar.config._config.data.labels = x;
  bar.config._config.data.datasets[0].data = y;
  if (contine) {
    // bar.options.scales.x.type = "category";
    bar.config._config.data.datasets[0].categoryPercentage = 1;
    bar.config._config.data.datasets[0].barPercentage = 1;
    bar.config._config.data.datasets[0].barThickness = "flex";
  } else {
    // bar.options.scales.x.type = "linear";
    bar.config._config.data.datasets[0].barThickness = 3;
  }

  bar.update();
}
async function courbe(x, y) {
  document.querySelector(".line").classList.add("open");
  line.config._config.data.labels = x;
  line.config._config.data.datasets[0].data = y;
  line.update();
}

function moustache(data, Q1, Q2, Q3) {
  const div = document.querySelector(".mostache");
  div.classList.add("open");
  if (document.querySelector(".mostache svg")) {
    document.querySelector(".mostache svg").remove();
  }
  let width, height;
  if (div.className.search("rotate90") == -1) {
    (width = div.clientWidth - 20), (height = div.clientHeight - 20);
  } else {
    (width = div.clientWidth - 40), (height = div.clientHeight - 40);
  }
  let margin = { top: 20, right: 30, bottom: 20, left: 40 };
  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;
  let svg = d3
    .select(".mostache")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  let min = minInArray(data);
  let max = maxInArray(data);
  // Show the Y scale
  let y = d3
    .scaleLinear()
    .domain([min - 1, max + 1])
    .range([height, 0]);
  svg.call(d3.axisLeft(y));
  // a few features for the box
  let center = width / 4;
  width = width / 5 <= 100 ? width / 5 : 100;

  // Show the main vertical line
  svg
    .append("line")
    .attr("x1", center)
    .attr("x2", center)
    .attr("y1", y(min))
    .attr("y2", y(max))
    .attr("stroke", "black");

  // Show the box
  svg
    .append("rect")
    .attr("x", center - width / 2)
    .attr("y", y(Q3))
    .attr("height", y(Q1) - y(Q3))
    .attr("width", width)
    .attr("stroke", "black")
    .style("fill", main_color);

  // show Q2, min and max horizontal lines
  svg
    .selectAll("toto")
    .data([min, Q2, max])
    .enter()
    .append("line")
    .attr("x1", center - width / 2)
    .attr("x2", center + width / 2)
    .attr("y1", function (d) {
      return y(d);
    })
    .attr("y2", function (d) {
      return y(d);
    })
    .attr("stroke", "black");
}

let up = document.querySelectorAll(".graphe .container > div .up");
up.forEach(function (el) {
  el.addEventListener("click", function () {
    document.querySelector(el.dataset.up).classList.toggle("rotate90");
    updateGraph(true);
  });
});
function updateGraph(chick) {
  if (chick) {
    bar.config._config.data.datasets[0].backgroundColor = main_color;
    line.config._config.data.datasets[0].backgroundColor = main_color;
    line.update("nane");
    bar.update("nane");
    if (typeOfSerie == "D") {
      moustache(dataXi(), Q1, Q2, Q3);
    }
  }
}
// const ctx = document.getElementById("ctx");
// // <block:segmentUtils:1>
// const chart = new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: [0, 1, 2, 3,4,5],
//     datasets: [
//       {
//         data: [19, 28, 40, 16,10,9],
//         backgroundColor: main_color,
//         categoryPercentage: 1,
//         barPercentage: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//         type: "linear",
//         stacked: true,
//       },
//       x: {
//         // offset:false,
//         // type: "linear",
//         stacked: true,
//       },
//     },
//   },
// });

// end function of Graphe

/*
--------------the end -------------------
--------------by badie bahida------------
--------------2023-----------------------
*/
