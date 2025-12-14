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
                label: 'TEAR SUPPLEMENTATION/STABILISATION',
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
                    'Internal and external device lid heating; IPL, LLLT\nIPL\nWarm compress',
                checked: false,
            },
            { label: 'BLINK THERAPIES', description: '', checked: false },
            { label: 'TOPICAL ANTI-INFLAMMATORIES', description: 'Cyclosporine A', checked: false },
        ],
        aqueous: [
            { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
            { label: 'ORAL NUTRITION', description: 'Omega 3', checked: false },
            {
                label: 'TEAR SUPPLEMENTATION/STABILISATION',
                description: 'Artificial tears',
                checked: false,
            },
            {
                label: 'TEAR CONSERVATION DEVICES',
                description: 'Moisture chamber spectacles\nPunctal plugs\nScleral contact lenses',
                checked: false,
            },
            {
                label: 'PHARMACOLOGICAL TEAR STIMULATION/RESTORATION',
                description:
                    'Selenium sulfide\nPharmacological neurostimulation\nTopical neurostimulation',
                checked: false,
            },
            {
                label: 'DEVICE TEAR STIMULATION/RESTORATION',
                description: 'Neurostimulation\nLLLT',
                checked: false,
            },
            { label: 'TOPICAL ANTI-INFLAMMATORIES', description: '', checked: false },
            { label: 'OCULAR SURFACE REGENERATORS', description: 'Biologics', checked: false },
            { label: 'SURGICAL OPTIONS', description: '', checked: false },
        ],
        'mucin-glycocalyx': [
            { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
            {
                label: 'PHARMACOLOGICAL TEAR STIMULATION/RESTORATION',
                description: '',
                checked: false,
            },
            {
                label: 'DEVICE TEAR STIMULATION/RESTORATION',
                description: 'Neurostimulation',
                checked: false,
            },
            { label: 'TOPICAL ANTI-INFLAMMATORIES', description: '', checked: false },
        ],
        'blink-lid-closure': [
            { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
            {
                label: 'TEAR CONSERVATION DEVICES',
                description: 'Moisture chamber spectacles',
                checked: false,
            },
            { label: 'BLINK THERAPIES', description: '', checked: false },
            { label: 'SURGICAL OPTIONS', description: '', checked: false },
        ],
        'lid-margin': [
            {
                label: 'ANTERIOR BLEPHARITIS',
                description: '',
                checked: false,
                subOptions: [
                    { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
                    {
                        label: 'TOPICAL LID HYGIENE (e.g. reducing bacterial load)',
                        description: '',
                        checked: false,
                    },
                    { label: 'ORAL ANTIBIOTICS', description: '', checked: false },
                ],
            },
            {
                label: 'MEIBOMIAN GLAND DYSFUNCTION',
                description: '',
                checked: false,
                subOptions: [
                    { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
                    { label: 'ORAL NUTRITION', description: 'Omega 3\nVitamin D3', checked: false },
                    {
                        label: 'TEAR SUPPLEMENTATION/STABILISATION',
                        description: 'Lipomimetics',
                        checked: false,
                    },
                    {
                        label: 'PHARMACOLOGICAL TEAR STIMULATION/RESTORATION',
                        description: 'Topical azithromycin, Selenium sulfide',
                        checked: false,
                    },
                    {
                        label: 'DEVICE TEAR STIMULATION/RESTORATION',
                        description: 'Internal and external device lid heating; IPL, LLLT; QMR',
                        checked: false,
                    },
                    {
                        label: 'LID MARGIN DEBRIDEMENT',
                        description: 'When significant keratinization',
                        checked: false,
                    },
                    {
                        label: 'BLINK THERAPIES',
                        description: '',
                        checked: false,
                    },
                    {
                        label: 'TOPICAL ANTI-INFLAMMATORIES',
                        description: 'Cyclosporine A',
                        checked: false,
                    },
                    { label: 'ORAL ANTIBIOTICS', description: '', checked: false },
                ],
            },
        ],
        'anatomical-misalignment': [
            { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
            { label: 'SURGICAL OPTIONS', description: '', checked: false },
        ],
        'neural-dysfunction': [
            { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
            {
                label: 'TEAR SUPPLEMENTATION/STABILISATION',
                description: 'Vit A/B12 ascorbic acid',
                checked: false,
            },
            { label: 'OCULAR SURFACE REGENERATORS', description: 'Biologics', checked: false },
            { label: 'SURGICAL OPTIONS', description: 'Punctal occlusion', checked: false },
        ],
        'ocular-surface-cellular': [
            { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
            { label: 'ORAL NUTRITION', description: 'Vitamin D3', checked: false },
            {
                label: 'TEAR SUPPLEMENTATION/STABILISATION',
                description: 'Hyaluronic acid, trehalose, xanthan, perfluorohexyloctane & HP-guar',
                checked: false,
            },
            {
                label: 'PHARMACOLOGICAL TEAR STIMULATION/RESTORATION',
                description:
                    'Oral secretagogues\nTopical secretagogues\nPharmacological neuromodulation',
                checked: false,
            },
            {
                label: 'DEVICE TEAR STIMULATION/RESTORATION',
                description:
                    'LLLT; QMR; neurostimulation\nIPL; probing external device lid heating; topical secretagogues',
                checked: false,
            },
            {
                label: 'BLINK THERAPIES',
                description: 'External device lid heating, topical secretagogues',
                checked: false,
            },
            { label: 'TOPICAL LID HYGIENE', description: '', checked: false },
            { label: 'TOPICAL ANTI-INFLAMMATORIES', description: '', checked: false },
            {
                label: 'OCULAR SURFACE REGENERATORS',
                description: 'Lubricin Biologics',
                checked: false,
            },
            { label: 'SURGICAL OPTIONS', description: 'Punctal occlusion', checked: false },
        ],
        'primary-inflammation': [
            {
                label: 'PRIMARY',
                description: '',
                checked: false,
                subOptions: [
                    { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
                    { label: 'TOPICAL ANTI-INFLAMMATORIES', description: '', checked: false },
                    {
                        label: 'OCULAR SURFACE REGENERATORS',
                        description: 'Amniotic membrane',
                        checked: false,
                    },
                ],
            },
            {
                label: 'SECONDARY',
                description: '',
                checked: false,
                subOptions: [
                    { label: 'LIFESTYLE ADVICE', description: 'To be considered', checked: false },
                    {
                        label: 'ORAL NUTRITION',
                        description: 'Omega 3, vitamin D3',
                        checked: false,
                    },
                    {
                        label: 'TEAR SUPPLEMENTATION/STABILISATION',
                        description: 'Hyaluronic acid, selenoprotein P, xanthan & HP-guar, serum',
                        checked: false,
                    },
                    {
                        label: 'TEAR CONSERVATION DEVICES',
                        description: 'Pharmacological modulation',
                        checked: false,
                    },
                    {
                        label: 'PHARMACOLOGICAL TEAR STIMULATION/RESTORATION',
                        description: 'Pharmacological neuromodulation',
                        checked: false,
                    },
                    {
                        label: 'DEVICE TEAR STIMULATION/RESTORATION',
                        description: 'IPL',
                        checked: false,
                    },
                    { label: 'LID MARGIN DEBRIDEMENT', description: '', checked: false },
                    { label: 'BLINK THERAPIES', description: '', checked: false },
                    {
                        label: 'TOPICAL LID HYGIENE (e.g. reducing bacterial load)',
                        description: '',
                        checked: false,
                    },
                    { label: 'TOPICAL ANTI-INFLAMMATORIES', description: '', checked: false },
                    {
                        label: 'OCULAR SURFACE REGENERATORS',
                        description: 'Amniotic membrane',
                        checked: false,
                    },
                    { label: 'SURGICAL OPTIONS', description: 'Punctal occlusion', checked: false },
                ],
            },
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
