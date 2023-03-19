export const ADMIN_FACET_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'getAdmin',
    outputs: [
      {
        internalType: 'enum LibAdmin.Roles',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'isAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'isSuperAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'removeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
      {
        internalType: 'enum LibAdmin.Roles',
        name: '_role',
        type: 'uint8',
      },
    ],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const COHORT_FACTORY_FACET_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_startDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endDate',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_size',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_commitment',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
    ],
    name: 'newCohort',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const COHORT_FACET_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'cohort',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'size',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'commitment',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'enum Cohort.Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'studentsCount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
        ],
        internalType: 'struct Cohort.CohortDetails',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cohorts',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'size',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'commitment',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'enum Cohort.Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'studentsCount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
        ],
        internalType: 'struct Cohort.CohortDetails[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cohort',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_stableCoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_ekoNft',
        type: 'address',
      },
    ],
    name: 'initCohort',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const COHORT_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_startDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endDate',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_size',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_commitment',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'cohort',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'size',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'commitment',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'enum Cohort.Status',
        name: 'status',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'studentsCount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ekoStableAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'enroll',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCohort',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'size',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'commitment',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'enum Cohort.Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'studentsCount',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'contractAddress',
            type: 'address',
          },
        ],
        internalType: 'struct Cohort.CohortDetails',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stableCoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_ekoNft',
        type: 'address',
      },
    ],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_student',
        type: 'address',
      },
    ],
    name: 'isStudent',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_certificateId',
        type: 'uint256',
      },
    ],
    name: 'refund',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum Cohort.Status',
        name: '_status',
        type: 'uint8',
      },
    ],
    name: 'updateStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const CROWDFUNDING_FACET_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectIndex',
        type: 'uint256',
      },
    ],
    name: 'ProjectDoesNotExist',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'projectAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contributedAmount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'contributor',
        type: 'address',
      },
    ],
    name: 'ContributionReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'projectAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountWithdrawn',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'withdrawer',
        type: 'address',
      },
    ],
    name: 'FundWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'projectContractAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'desc',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetFund',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minContribution',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256',
      },
    ],
    name: 'ProjectStarted',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'IsUserADonor',
    outputs: [
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
    ],
    name: 'adminWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_projectTopic',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_targetFund',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_minimumDonation',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_acceptedCurrency',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_projectPeriod',
        type: 'uint256',
      },
    ],
    name: 'createCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_tokenAmount',
        type: 'uint256',
      },
    ],
    name: 'donate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
    ],
    name: 'donorWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'X',
        type: 'uint256',
      },
    ],
    name: 'getLastXProjectDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'admin',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'projectAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'targetFund',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDonationRecieved',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minimumDonation',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountWithdrawn',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'projectTopic',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'noOfDonors',
            type: 'uint256',
          },
          {
            internalType: 'enum Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'address[]',
            name: 'donors',
            type: 'address[]',
          },
        ],
        internalType: 'struct Database.ProjectState[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
    ],
    name: 'getProjectBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
    ],
    name: 'getProjectDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'admin',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'projectAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'targetFund',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDonationRecieved',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minimumDonation',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountWithdrawn',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'projectTopic',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'noOfDonors',
            type: 'uint256',
          },
          {
            internalType: 'enum Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'address[]',
            name: 'donors',
            type: 'address[]',
          },
        ],
        internalType: 'struct Database.ProjectState',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'returnProjectsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const GOVERNANCE_FACET_ABI = [
  {
    inputs: [],
    name: 'AlreadyInitialized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AlreadyVoted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CallerNotDelegate',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EmptyInput',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InsufficientBalance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidCountInput',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidProposal',
    type: 'error',
  },
  {
    inputs: [],
    name: 'StartLessThanCount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'VotingNotStarted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'VotingPeriodOver',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroInput',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_delegate',
        type: 'address',
      },
    ],
    name: 'addVotingDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'voter',
        type: 'address',
      },
    ],
    name: 'checkIfVoted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
    ],
    name: 'deleteProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
    ],
    name: 'endVoting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
    ],
    name: 'getLost',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'creationTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingDelay',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'votesFor',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'votesAgainst',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'minVotingTokenReq',
            type: 'uint16',
          },
          {
            internalType: 'enum LibGovernance.State',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct LibGovernance.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
    ],
    name: 'getNotStarted',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'creationTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingDelay',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'votesFor',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'votesAgainst',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'minVotingTokenReq',
            type: 'uint16',
          },
          {
            internalType: 'enum LibGovernance.State',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct LibGovernance.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNumberOfProposals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
    ],
    name: 'getOngoing',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'creationTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingDelay',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'votesFor',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'votesAgainst',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'minVotingTokenReq',
            type: 'uint16',
          },
          {
            internalType: 'enum LibGovernance.State',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct LibGovernance.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
    ],
    name: 'getProposals',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'creationTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingDelay',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'votesFor',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'votesAgainst',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'minVotingTokenReq',
            type: 'uint16',
          },
          {
            internalType: 'enum LibGovernance.State',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct LibGovernance.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
    ],
    name: 'getStalemate',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'creationTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingDelay',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'votesFor',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'votesAgainst',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'minVotingTokenReq',
            type: 'uint16',
          },
          {
            internalType: 'enum LibGovernance.State',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct LibGovernance.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'count',
        type: 'uint256',
      },
    ],
    name: 'getWon',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'creationTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingDelay',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'votesFor',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'votesAgainst',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'minVotingTokenReq',
            type: 'uint16',
          },
          {
            internalType: 'enum LibGovernance.State',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct LibGovernance.Proposal[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'intializeGovernance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_delay',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_votingDuration',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: '_minVotingTokenReq',
        type: 'uint16',
      },
    ],
    name: 'newProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
    ],
    name: 'removeDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
    ],
    name: 'startVoting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_delegate',
        type: 'address',
      },
    ],
    name: 'viewDelegate',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
    ],
    name: 'viewProposal',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'creationTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingDelay',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votingPeriod',
            type: 'uint256',
          },
          {
            internalType: 'uint32',
            name: 'votesFor',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'votesAgainst',
            type: 'uint32',
          },
          {
            internalType: 'uint16',
            name: 'minVotingTokenReq',
            type: 'uint16',
          },
          {
            internalType: 'enum LibGovernance.State',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct LibGovernance.Proposal',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
    ],
    name: 'voteAgainst',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'delegator',
        type: 'address',
      },
    ],
    name: 'voteAgainstAsDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
    ],
    name: 'voteFor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'Proposal_ID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'delegator',
        type: 'address',
      },
    ],
    name: 'voteForAsDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const HACKATHON_FACET_ABI = [
  {
    inputs: [],
    name: 'HackathonNotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidCountInput',
    type: 'error',
  },
  {
    inputs: [],
    name: 'WrongStartAndCountInput',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
    ],
    name: 'endHackathon',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'fundHackathon',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
    ],
    name: 'getHackathon',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'hackathonAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'maxNumAdmittable',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'numOfStudent',
            type: 'uint16',
          },
          {
            internalType: 'address',
            name: 'winner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'firstRunnerUp',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'secondRunnerUp',
            type: 'address',
          },
          {
            internalType: 'uint8',
            name: 'winnerPercentage',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'firstRunnerUpPercentage',
            type: 'uint8',
          },
          {
            internalType: 'uint8',
            name: 'secondRunnerUpPercentage',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'funding',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'minScoreTokenRequired',
            type: 'uint16',
          },
          {
            internalType: 'enum LibHackFund.State',
            name: 'state',
            type: 'uint8',
          },
        ],
        internalType: 'struct LibHackFund.Hack',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_acceptedCurrency',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_scoretoken',
        type: 'address',
      },
    ],
    name: 'initializeHackathon',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'participant',
        type: 'address',
      },
    ],
    name: 'isParticipant',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_startDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endDate',
        type: 'uint256',
      },
      {
        internalType: 'uint16',
        name: '_maxNumAdmittable',
        type: 'uint16',
      },
      {
        internalType: 'uint8',
        name: '_winnerPercentage',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: '_firstRunnerUpPercentage',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: '_secondRunnerUpPercentage',
        type: 'uint8',
      },
      {
        internalType: 'uint16',
        name: '_minScoreTokenRequiurement',
        type: 'uint16',
      },
    ],
    name: 'newHackathon',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numberofHackathons',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
    ],
    name: 'prizeWithdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
    ],
    name: 'refundScoreTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_winner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_firstRunnerUp',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_secondRunnerUp',
        type: 'address',
      },
    ],
    name: 'setPrizeWinners',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'hackID',
        type: 'uint256',
      },
    ],
    name: 'startHackathon',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
