import { LightningElement, track, api } from 'lwc';
import Store from './store';

const store = new Store();

let startTime;
let lastMeasure;

function startMeasure(name) {
    startTime = performance.now();
    lastMeasure = name;
}

function stopMeasure () {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            console.log(last + " took " + (stop - startTime));
        }, 0);
    }
}

function generateRows(store) {
    const { selected, data } = store;

    return data.map(row => ({
        ...row,
        className: row.id === selected ? 'danger' : '',
    }));
}

export default class App extends LightningElement {
    @track rows = [];

    _hasRendered = false;

    run() {
        startMeasure('run');
        store.run();
        this.rows = generateRows(store);
    }

    runLots() {
        startMeasure('runLots');
        store.runLots();
        this.rows = generateRows(store);
    }

    add() {
        startMeasure('add');
        store.add();
        this.rows = generateRows(store);
    }

    update() {
        startMeasure('update');
        store.update();
        this.rows = generateRows(store);
    }

    clear() {
        startMeasure('clear');
        store.clear();
        this.rows = generateRows(store);
    }

    swapRows() {
        startMeasure('swapRows');
        store.swapRows();
        this.rows = generateRows(store);
    }

    handleRowClick(evt) {
        const { target } = evt;
        const interaction = target.getAttribute('data-interaction');
        const id = target.getAttribute('data-id');
        
        if (interaction !== null && id !== null) {
            if (interaction === 'select') {
                startMeasure('select');
                store.select(parseInt(id));
            } else if (interaction === 'remove') {
                startMeasure('delete');
                store.delete(parseInt(id));
            }

            this.rows = generateRows(store);
        }
    }

    renderedCallback() {
        stopMeasure();

        if (!this._hasRendered) {
            this._hasRendered = true;

            const btns = this.template.querySelectorAll('[data-btn-id]');
            for (let btn of btns) {
                btn.id = btn.dataset.btnId;
            }
        }
    }
}