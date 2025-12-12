import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useClinicalDataStore = defineStore('clinicalData', () => {
    // Testing data for each subcategory
    const testingData = {
        lipid: {
            standard: [
                {
                    name: 'INTERFEROMETRY',
                    description:
                        'grade ≤ 3 (non-amorphous or colored pattern) or <72nm on LipiView 197, 320, 343',
                },
                {
                    name: 'MEIBUM EXPRESSIBILITY/QUALITY',
                    description: 'meibum not clear or limited expressibility 332, 371, 715',
                },
            ],
            advanced: null,
        },
        aqueous: {
            standard: [
                {
                    name: 'MENISCOMETRY',
                    description: 'Tear meniscus height ≤0.20mm',
                    refs: [39, 320, 380],
                },
            ],
            advanced: [
                {
                    name: 'STRIP MENISCOMETRY',
                    description: '2.5mm wetting length',
                    refs: ['404-406'],
                },
                {
                    name: 'TEAR PROTEINS AND OTHER CHEMICAL COMPONENTS TESTING',
                },
            ],
        },
        'mucin-glycocalyx': {
            standard: [
                {
                    name: 'ROSE BENGAL OR LISSAMINE GREEN STAINING',
                    description: '>9 punctate spots',
                    refs: [581],
                },
            ],
            advanced: [
                {
                    name: 'IMMUNOHISTOCHEMISTRY AND IMMUNOELECTRON MICROSCOPY OF TEAR FILM',
                },
                {
                    name: 'IMPRESSION CYTOLOGY',
                    description: 'Goblet cell density and epithelial cell morphology',
                },
            ],
        },
        'blink-lid-closure': {
            standard: [
                {
                    name: 'PARTIAL BLINKING OBSERVATION',
                    description: '>40% occurrence',
                    refs: [463],
                },
                {
                    name: 'LAGOPHTHALMOS / INADEQUATE LID SEAL',
                    description: 'Observed',
                },
            ],
            advanced: null,
        },
        'lid-margin': {
            standard: [{ name: 'ANTERIOR BLEPHARITIS OBSERVATION' }, { name: 'MGD' }],
            advanced: [
                {
                    name: 'MEIBOGRAPHY',
                    description: 'Gland length <75%',
                    refs: [320, 372, 509],
                },
                {
                    name: 'GLAND PLUGGING',
                    description: 'Observed',
                    refs: [715],
                },
                {
                    name: 'TELANGIECTASIA',
                    description: 'Observed',
                    refs: [715],
                },
                { name: 'GLAND EXPRESSIBILITY' },
            ],
        },
        'anatomical-misalignment': {
            standard: [{ name: 'SLIT-LAMP BIOMICROSCOPY' }],
            advanced: [{ name: 'CORNEAL TOPOGRAPHY' }],
        },
        'neural-dysfunction': {
            standard: [
                {
                    name: 'PUFF OR PHYSICAL SENSATION',
                    description:
                        'Corneal and lid margin sensitivity thresholds ≥0.8 mbar although instruments are not comparable',
                    refs: [550, 716],
                },
            ],
            advanced: [
                {
                    name: 'IN VIVO CONFOCAL MICROSCOPY',
                    description:
                        'Normative values available for nerve length, branch and density metrics',
                    refs: [717],
                },
            ],
        },
        'ocular-surface-cellular': {
            standard: [
                {
                    name: 'CORNEAL FLUORESCEIN STAINING',
                    description: '>5 punctate spots',
                    refs: [250, 581],
                },
                {
                    name: 'CONJUNCTIVAL LISSAMINE GREEN STAINING',
                    description: '>9 punctate spots',
                    refs: [250, 581],
                },
                {
                    name: 'LID WIPER STAINING',
                    description: '>2mm length and 25% width',
                    refs: [250],
                },
            ],
            advanced: null,
        },
        'primary-inflammation': {
            standard: [
                {
                    name: 'BULBAR CONJUNCTIVAL HYPERAEMIA',
                    description: '>1.5 Efron scale or >0.95 objective JENVIS',
                    refs: [604],
                },
            ],
            advanced: [
                { name: 'IN VIVO CONFOCAL MICROSCOPY' },
                { name: 'TEAR FILM AND OCULAR SURFACE MOLECULAR TESTING' },
            ],
        },
    }

    // Management items for each subcategory (reactive for checkbox state)
    const managementItems = reactive({
        lipid: [
            { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
            {
                label: 'TEAR SUPPLEMENTATION/STABILIZATION',
                description: 'Lipomimetics',
                checked: false,
            },
            {
                label: 'TEAR CONSERVATION DEVICES',
                description: 'Moisture chamber spectacles',
                checked: false,
            },
            {
                label: 'PHARMACOLOGICAL TEAR STIMULATION/RESTORATION',
                description: 'Topical secretagogues',
                checked: false,
            },
            {
                label: 'DEVICE TEAR STIMULATION/RESTORATION',
                description:
                    'Internal and external device lid heating; IPL; LLLT\nIPL\nWarm compress',
                checked: false,
            },
            { label: 'TOPICAL ANTI-INFLAMMATORIES', description: 'Cyclosporine A', checked: false },
        ],
        aqueous: [
            {
                label: 'LIFESTYLE ADVICE',
                description: 'Environmental modifications',
                checked: false,
            },
            {
                label: 'TEAR SUPPLEMENTATION',
                description: 'Aqueous-based lubricants',
                checked: false,
            },
            {
                label: 'PUNCTAL OCCLUSION',
                description: 'Temporary or permanent plugs',
                checked: false,
            },
            { label: 'SECRETAGOGUES', description: 'Topical diquafosol', checked: false },
        ],
        'mucin-glycocalyx': [
            { label: 'LIFESTYLE ADVICE', description: 'Screen time management', checked: false },
            { label: 'TEAR SUPPLEMENTATION', description: 'Mucin-enhancing drops', checked: false },
            { label: 'VITAMIN A', description: 'Topical retinoid therapy', checked: false },
            {
                label: 'AUTOLOGOUS SERUM',
                description: 'Growth factor supplementation',
                checked: false,
            },
        ],
        'blink-lid-closure': [
            { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
            {
                label: 'TEAR CONSERVATION DEVICES',
                description: 'Moisture chamber spectacles',
                checked: false,
            },
            { label: 'BLINK THERAPIES', description: 'To be considered', checked: false },
            { label: 'SURGICAL OPTIONS', description: 'To be considered', checked: false },
        ],
        'lid-margin': [
            { label: 'LIFESTYLE ADVICE', description: 'Dietary modifications', checked: false },
            { label: 'LID HYGIENE', description: 'Daily cleansing routine', checked: false },
            { label: 'THERMAL THERAPY', description: 'IPL and warm compress', checked: false },
            { label: 'TOPICAL ANTIBIOTICS', description: 'Azithromycin ointment', checked: false },
        ],
        'anatomical-misalignment': [
            { label: 'LIFESTYLE ADVICE', description: 'UV protection', checked: false },
            { label: 'TEAR SUPPLEMENTATION', description: 'Viscous lubricants', checked: false },
            { label: 'SURGICAL REFERRAL', description: 'Conjunctival procedures', checked: false },
            { label: 'ANTI-INFLAMMATORY', description: 'Topical steroids PRN', checked: false },
        ],
        'neural-dysfunction': [
            { label: 'LIFESTYLE ADVICE', description: 'Stress management', checked: false },
            { label: 'NEUROSTIMULATION', description: 'Intranasal devices', checked: false },
            { label: 'NEUROPATHIC AGENTS', description: 'Low-dose naltrexone', checked: false },
            { label: 'AUTOLOGOUS SERUM', description: 'Nerve growth factors', checked: false },
        ],
        'ocular-surface-cellular': [
            { label: 'LIFESTYLE ADVICE', description: 'Allergen avoidance', checked: false },
            {
                label: 'TEAR SUPPLEMENTATION',
                description: 'Preservative-free drops',
                checked: false,
            },
            {
                label: 'ANTI-INFLAMMATORY',
                description: 'Cyclosporine or lifitegrast',
                checked: false,
            },
            { label: 'AMNIOTIC MEMBRANE', description: 'Cryopreserved grafts', checked: false },
        ],
        'primary-inflammation': [
            { label: 'LIFESTYLE ADVICE', description: 'Anti-inflammatory diet', checked: false },
            { label: 'TOPICAL STEROIDS', description: 'Short-term pulse therapy', checked: false },
            { label: 'IMMUNOMODULATORS', description: 'Cyclosporine A', checked: false },
            { label: 'OMEGA-3 SUPPLEMENTS', description: 'High-dose EPA/DHA', checked: false },
        ],
    })

    // Subcategory configuration with display info
    const subcategoryConfig = {
        // Tear Film Deficiencies
        lipid: {
            category: 'TEAR FILM DEFICIENCIES',
            title: 'LIPID',
            color: 'blue',
            diamond: 'tear',
        },
        aqueous: {
            category: 'TEAR FILM DEFICIENCIES',
            title: 'AQUEOUS',
            color: 'blue',
            diamond: 'tear',
        },
        'mucin-glycocalyx': {
            category: 'TEAR FILM DEFICIENCIES',
            title: 'MUCIN GLYCOCALYX',
            color: 'blue',
            diamond: 'tear',
        },
        // Eyelid Anomalies
        'blink-lid-closure': {
            category: 'EYELID ANOMALIES',
            title: 'BLINK / LID CLOSURE',
            color: 'teal',
            diamond: 'eyelid',
        },
        'lid-margin': {
            category: 'EYELID ANOMALIES',
            title: 'LID MARGIN',
            color: 'teal',
            diamond: 'eyelid',
        },
        // Ocular Surface Abnormalities
        'anatomical-misalignment': {
            category: 'OCULAR SURFACE ABNORMALITIES',
            title: 'ANATOMICAL MISALIGNMENT',
            color: 'purple',
            diamond: 'ocular',
        },
        'neural-dysfunction': {
            category: 'OCULAR SURFACE ABNORMALITIES',
            title: 'NEURAL DYSFUNCTION',
            color: 'purple',
            diamond: 'ocular',
        },
        'ocular-surface-cellular': {
            category: 'OCULAR SURFACE ABNORMALITIES',
            title: 'CELLULAR DAMAGE',
            color: 'purple',
            diamond: 'ocular',
        },
        'primary-inflammation': {
            category: 'OCULAR SURFACE ABNORMALITIES',
            title: 'INFLAMMATION',
            color: 'purple',
            diamond: 'ocular',
        },
    }

    // Getters
    function getTestingData(subcategoryId) {
        return testingData[subcategoryId] || { standard: [], advanced: [] }
    }

    function getManagementItems(subcategoryId) {
        return managementItems[subcategoryId] || []
    }

    function getSubcategoryConfig(subcategoryId) {
        return subcategoryConfig[subcategoryId] || null
    }

    function updateManagementItems(subcategoryId, newItems) {
        if (managementItems[subcategoryId]) {
            managementItems[subcategoryId] = newItems
        }
    }

    // Get all subcategory IDs
    function getAllSubcategoryIds() {
        return Object.keys(subcategoryConfig)
    }

    return {
        testingData,
        managementItems,
        subcategoryConfig,
        getTestingData,
        getManagementItems,
        getSubcategoryConfig,
        updateManagementItems,
        getAllSubcategoryIds,
    }
})
