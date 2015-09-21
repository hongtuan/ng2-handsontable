/// <reference path="../../../tsd.d.ts" />

import {
  Component, View,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass
} from 'angular2/angular2';

import {handsontable} from '../../../components/index';

declare var Handsontable:any;
declare var chroma:any;

// webpack html imports
let template = require('./sheet-demo.html');


let heatmapScale = chroma.scale(['#17F556', '#ED6D47']);
let heatmap = [];

function updateHeatmap(change, source) {
  if (change) {
    heatmap[change[0][1]] = generateHeatmapData(this, change[0][1]);
  } else {
    heatmap = [];

    for (var i = 1, colCount = this.countCols(); i < colCount; i++) {
      heatmap[i] = generateHeatmapData(this, i);
    }
  }
}

function point(min, max, value) {
  return (value - min) / (max - min);
}

function generateHeatmapData(context:any, colId) {
  let values = context.getDataAtCol(colId);

  return {
    min: Math.min.apply(null, values),
    max: Math.max.apply(null, values)
  };
}

function heatmapRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);

  if (heatmap[col]) {
    td.style.backgroundColor = heatmapScale(point(heatmap[col].min, heatmap[col].max, parseFloat(value))).hex();
    td.style.textAlign = 'right';
    td.style.fontWeight = 'bold';
  }
}

@Component({
  selector: 'science-demo'
})
@View({
  template: template,
  directives: [handsontable, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class ScienceDemo {
  private data:Array<any>;
  private options:any = {
    height: 600,
    colHeaders: ['Line chart', 'Frequency', 'Average age', 'Frequency', 'Average age'],
    rowHeaders: true,
    stretchH: 'all',
    columnSorting: true,
    columns: [
      {data: 0, renderer: 'html'},
      {data: 1, type: 'numeric', format: '0[.]000000000000000'},
      {data: 2, type: 'numeric', format: '0[.]000000000000000', renderer: heatmapRenderer},
      {data: 3, type: 'numeric', format: '0[.]000000000000000'},
      {data: 4, type: 'numeric', format: '0[.]000000000000000', renderer: heatmapRenderer}
    ],
    afterLoadData: updateHeatmap,
    beforeChangeRender: updateHeatmap,
    mergeCells: [
      {row: 0, col: 0, rowspan: 20, colspan: 1}
    ]
  };

  constructor() {
    this.data = [
      ['<div><a href="https://plot.ly/~JStevens/0/" target="_blank" title="An Age Distribution for Scientific Genius" style="display: block; text-align: center;"><img src="https://plot.ly/~JStevens/0.png" alt="An Age Distribution for Scientific Genius" style="max-width: 100%;width: 600px;"  width="600" onerror="this.onerror=null;this.src="\'https://plot.ly/404.png\'";" /></a><script data-plotly="JStevens:0" src="https://plot.ly/embed.js" async/></div>', 0.0008686210640608003, 18.235294117647058, 0.0015472312703583065, 18.235294117647058],
      ['', 0.0013436482084690554, 18.96551724137931, 0.002219055374592834, 18.843813387423936],
      ['', 0.0019408251900108608, 19.69574036511156, 0.0031867535287730727, 19.391480730223122],
      ['', 0.0025651465798045606, 20.425963488843813, 0.004153094462540717, 20.073022312373226],
      ['', 0.0034337676438653607, 21.03448275862069, 0.004987785016286645, 20.669371196754565],
      ['', 0.004352153456387986, 21.460446247464503, 0.006317861020629753, 21.399594320486816],
      ['', 0.00521172638436482, 21.82555780933063, 0.0069625407166123785, 21.764705882352942],
      ['', 0.006152732537097358, 22.190669371196755, 0.008170466883821935, 22.251521298174442],
      ['', 0.007229460731089401, 22.55578093306288, 0.008794788273615637, 22.616632860040568],
      ['', 0.008387622149837135, 22.920892494929006, 0.010173724212812157, 22.920892494929006],
      ['', 0.009373868982989511, 23.28600405679513, 0.010749185667752443, 23.164300202839755],
      ['', 0.01029677886355411, 23.651115618661258, 0.012061165399927623, 23.529411764705884],
      ['', 0.011156351791530943, 24.016227180527384, 0.012703583061889253, 23.772819472616632],
      ['', 0.012228555917481, 24.381338742393506, 0.014026872964169382, 24.04665314401623],
      ['', 0.01296145494028231, 24.685598377281945, 0.014712269272529858, 24.259634888438136],
      ['', 0.014060803474484256, 24.989858012170387, 0.01604234527687297, 24.527383367139958],
      ['', 0.015228013029315961, 25.35496957403651, 0.01685667752442997, 24.746450304259632],
      ['', 0.016270358306188927, 25.65922920892495, 0.018159609120521177, 25.020283975659225],
      ['', 0.01738599348534202, 25.963488843813387, 0.01881107491856678, 25.233265720081135],
      ['', 0.018611563517915312, 26.3894523326572, 0.020199511400651467, 25.50709939148073],
      ['', 0.01980456026058632, 26.69371196754564, 0.02092833876221498, 25.72008113590264],
      ['', 0.020863192182410423, 26.937119675456387, 0.022190553745928338, 26.024340770791074],
      ['', 0.022339847991313787, 27.302231237322516, 0.022923452768729643, 26.3894523326572],
      ['', 0.023452768729641693, 27.72819472616633, 0.02438925081433225, 26.754563894523326],
      ['', 0.024267100977198697, 27.91075050709939, 0.025868621064060807, 27.18052738336714],
      ['', 0.0254343105320304, 28.154158215010142, 0.026673905175533846, 27.545638945233264],
      ['', 0.026302931596091206, 28.45841784989858, 0.02776872964169381, 27.789046653144013],
      ['', 0.027280130293159614, 28.76267748478702, 0.028574918566775243, 27.971602434077077],
      ['', 0.028338762214983715, 29.12778904665314, 0.03022801302931596, 28.3367139959432],
      ['', 0.02915309446254072, 29.43204868154158, 0.03102605863192183, 28.640973630831645],
      ['', 0.030103148751357223, 29.73630831643002, 0.03213219326818676, 28.945233265720077],
      ['', 0.031351791530944625, 30.162271805273832, 0.03285830618892508, 29.310344827586206],
      ['', 0.03264169381107492, 30.563894523326567, 0.03405266015200869, 29.675456389452336],
      ['', 0.033819218241042344, 30.831643002028393, 0.03517915309446254, 30.162271805273832],
      ['', 0.03510314875135723, 31.075050709939145, 0.0362785016286645, 30.649087221095332],
      ['', 0.0362785016286645, 31.50101419878296, 0.037595005428881646, 31.379310344827587],
      ['', 0.037377850162866454, 31.74442190669371, 0.03866449511400652, 32.14604462474645],
      ['', 0.03853691639522258, 32.04868154158215, 0.03952768729641694, 32.7789046653144],
      ['', 0.0396742671009772, 32.535496957403645, 0.04090662323561346, 33.32657200811359],
      ['', 0.04063517915309446, 33.08316430020284, 0.04201954397394137, 33.935091277890464],
      ['', 0.04175488599348534, 33.75253549695741, 0.0430985342019544, 34.42190669371197],
      ['', 0.042345276872964174, 34.36105476673428, 0.04424538545059718, 35.030425963488845],
      ['', 0.04367535287730728, 34.908722109533464, 0.04480456026058634, 35.74847870182555],
      ['', 0.04432681867535289, 35.51724137931035, 0.04489685124864278, 36.49087221095334],
      ['', 0.044869706840390884, 36.21703853955374, 0.0445928338762215, 37.18458417849898],
      ['', 0.04497828447339849, 36.977687626774845, 0.04391965255157438, 37.76876267748479],
      ['', 0.04491042345276873, 37.7079107505071, 0.04318675352877307, 38.073022312373226],
      ['', 0.04453040173724213, 38.43813387423935, 0.042064784654361205, 38.681541582150096],
      ['', 0.04413680781758958, 39.04665314401622, 0.04071661237785017, 39.22920892494928],
      ['', 0.04325913861744481, 39.65517241379311, 0.03971226927252986, 39.59432048681541],
      ['', 0.042691368078175904, 40.26369168356999, 0.03815146579804561, 40.081135902636916],
      ['', 0.041564875135722046, 40.750507099391484, 0.03754071661237785, 40.324543610547664],
      ['', 0.040640608034744855, 41.17647058823529, 0.036074918566775256, 40.56795131845842],
      ['', 0.039603691639522265, 41.54158215010142, 0.03550488599348534, 40.811359026369175],
      ['', 0.03845457835685849, 41.90669371196754, 0.034229098805646035, 41.05476673427992],
      ['', 0.03749547593195802, 42.271805273833664, 0.033469055374592833, 41.23732251521298],
      ['', 0.03653637350705755, 42.63691683569979, 0.03219326818675353, 41.54158215010142],
      ['', 0.03528094462540717, 43.00202839756592, 0.031541802388707935, 41.78498985801217],
      ['', 0.03392508143322477, 43.294117647058826, 0.030266015200868624, 42.1501014198783],
      ['', 0.03285830618892509, 43.793103448275865, 0.02953311617806732, 42.454361054766736],
      ['', 0.031939920376402475, 44.21906693711968, 0.02833876221498372, 42.880324543610556],
      ['', 0.031202497285559173, 44.523326572008116, 0.027687296416938116, 43.1237322515213],
      ['', 0.03018458197611293, 44.888438133874246, 0.02635179153094463, 43.537525354969574],
      ['', 0.029207383279044517, 45.31440162271805, 0.025570032573289908, 44.2920892494929],
      ['', 0.028019815418023886, 45.740365111561864, 0.024723127035830628, 44.94929006085192],
      ['', 0.02687296416938111, 46.22718052738337, 0.02348534201954397, 45.801217038539555],
      ['', 0.025848262757871887, 46.713995943204864, 0.022638436482084696, 46.470588235294116],
      ['', 0.02484618168657256, 47.139959432048684, 0.021864820846905535, 47.20081135902637],
      ['', 0.02397394136807818, 47.62677484787018, 0.021186210640608032, 48.29614604462475],
      ['', 0.023127035830618894, 48.17444219066937, 0.020385450597176984, 48.884381338742386],
      ['', 0.022090119435396308, 48.722109533468554, 0.01935396308360478, 49.39148073022312],
      ['', 0.021208830980817946, 49.208924949290065, 0.018892508143322474, 49.69574036511156],
      ['', 0.02010722041259501, 49.63488843813387, 0.017695439739413687, 50.182555780933065],
      ['', 0.018914223669923996, 50.06085192697769, 0.016775244299674273, 50.66937119675457],
      ['', 0.01782844733984799, 50.42596348884381, 0.015662323561346364, 51.217038539553755],
      ['', 0.016924538545059722, 50.851926977687626, 0.014766558089033658, 51.76470588235294],
      ['', 0.016069489685124862, 51.27789046653144, 0.014026872964169382, 52.2210953346856],
      ['', 0.014854777415852324, 51.70385395537525, 0.01319218241042345, 52.73833671399595],
      ['', 0.013802931596091209, 52.06896551724138, 0.0126900108577633, 53.40770791075052],
      ['', 0.012866449511400656, 52.4340770791075, 0.011543159609120526, 54.259634888438136],
      ['', 0.011909609120521171, 52.92089249492901, 0.010830618892508146, 54.62474645030425],
      ['', 0.010939196525515747, 53.40770791075051, 0.009636264929424545, 55.233265720081135],
      ['', 0.009853420195439734, 54.01622718052738, 0.008631921824104228, 55.841784989858006],
      ['', 0.008794788273615635, 54.74645030425964, 0.007980456026058637, 56.57200811359027],
      ['', 0.008102605863192176, 55.476673427991884, 0.007471498371335507, 57.3630831643002],
      ['', 0.007247557003257327, 56.206896551724135, 0.0068675352877307265, 57.97160243407708],
      ['', 0.006824104234527677, 56.8762677484787, 0.005822475570032569, 59.00608519269776],
      ['', 0.006487513572204123, 57.66734279918864, 0.005028501628664499, 59.73630831643002],
      ['', 0.00635179153094463, 58.39756592292089, 0.004424538545059723, 60.46653144016227],
      ['', 0.006039630836047772, 59.12778904665315, 0.00386807817589576, 61.25760649087221],
      ['', 0.005646036916395228, 59.85801217038539, 0.0036807817589576634, 61.86612576064908],
      ['', 0.005266015200868617, 60.58823529411764, 0.003583061889250809, 62.657200811359026],
      ['', 0.004869706840390869, 61.28194726166329, 0.0035152008686210575, 63.38742393509127],
      ['', 0.004356677524429961, 62.04868154158215, 0.0034201954397394163, 63.87423935091278],
      ['', 0.003778501628664497, 62.718052738336716, 0.0030537459283387597, 64.84787018255577],
      ['', 0.0030673181324647083, 63.50912778904665, 0.0030401737242128205, 65.39553752535497],
      ['', 0.002671009771986973, 64.27586206896551, 0.0027823018458197645, 66.30831643002028],
      ['', 0.002497285559174807, 64.96957403651115, 0.002605863192182404, 66.91683569979716],
      ['', 0.002263843648208466, 65.63894523326572, 0.0023615635179153054, 67.89046653144015],
      ['', 0.001940825190010856, 66.43002028397567, 0.0022801302931596138, 68.49898580121703],
      ['', 0.001872964169381108, 67.16024340770792, 0.002212269272529848, 69.47261663286005],
      ['', 0.0017915309446254028, 67.89046653144015, 0.0021986970684039126, 70.08113590263692],
      ['', 0.0017263843648208464, 68.55983772819474, 0.0019951140065146587, 71.05476673427991],
      ['', 0.0015472312703583106, 69.5943204868154, 0.0018526058631921807, 71.6632860040568],
      ['', 0.0014522258414766567, 70.32454361054766, 0.0017589576547231214, 72.57606490872212],
      ['', 0.001180781758957652, 71.05476673427992, 0.0015472312703582996, 73.30628803245436],
      ['', 0.000950054288816508, 71.78498985801217, 0.0014250814332247598, 74.0973630831643],
      ['', 0.000665038002171552, 72.51521298174443, null, null],
      ['', 0.0005157437567861012, 73.24543610547667, null, null],
      ['', 0.0004275244299674336, 73.85395537525355, null, null]
    ];
  }
}
