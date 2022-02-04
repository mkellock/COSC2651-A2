import { ChakraProvider, VStack, theme, Button, HStack, Heading, Icon, Input, FormControl, FormLabel, Table, Thead, Tr, Th, Tbody, Td, IconButton, InputGroup, InputLeftElement, Select, Text, Alert, AlertIcon } from "@chakra-ui/react";
import { FaHome, FaExclamationCircle, FaDollarSign, FaBuilding, FaCheck, FaTimes, FaQuestionCircle, FaCheckCircle, FaTimesCircle, FaHandshake, FaClock, FaLink } from "react-icons/fa";
import { Component } from "react";
import * as BC from "./Blockchain";
import { CopyBlock, nord } from "react-code-blocks";

interface IPermit {
    id: string;
    address?: string;
    owner?: string;
    design?: string;
    licence?: string;
    state: number;
}
interface IPermits extends Array<IPermit> {}

interface ILoan {
    id: string;
    name?: string;
    dob?: string;
    address?: string;
    number?: string;
    employerName?: string;
    income?: number;
    propertyAddress?: string;
    loanAmount?: number;
    state: number;
}
interface ILoans extends Array<ILoan> {}

interface IProps {}

interface IState {
    sellerVisible: boolean;
    authorityVisible: boolean;
    buyerVisible: boolean;
    bankVisible: boolean;
    dealsVisible: boolean;
    blockChainVisible: boolean;
    sellerAddress?: string;
    sellerOwner?: string;
    sellerDesign: string;
    sellerLicence?: string;
    sellerAddressInvalid: boolean;
    sellerOwnerInvalid: boolean;
    sellerDesignInvalid: boolean;
    sellerLicenceInvalid: boolean;
    permits: IPermits;
    buyerName?: string;
    buyerDOB?: string;
    buyerAddress?: string;
    buyerNumber?: string;
    buyerEmployerName?: string;
    buyerIncome?: number;
    buyerPropertyAddress?: string;
    buyerLoanAmount?: number;
    buyerNameInvalid: boolean;
    buyerDOBInvalid: boolean;
    buyerAddressInvalid: boolean;
    buyerNumberInvalid: boolean;
    buyerEmployerNameInvalid: boolean;
    buyerIncomeInvalid: boolean;
    buyerPropertyAddressInvalid: boolean;
    buyerLoanAmountInvalid: boolean;
    loans: ILoans;
    loanStatus?: any;
    blockchain: BC.IBlockchain;
    sellerMessage?: string;
    buyerMessage?: string;
}

class App extends Component<IProps, IState> {
    interval: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            sellerVisible: true,
            authorityVisible: false,
            buyerVisible: false,
            bankVisible: false,
            dealsVisible: false,
            blockChainVisible: false,
            sellerDesign: "design.pdf",
            sellerAddressInvalid: false,
            sellerOwnerInvalid: false,
            sellerDesignInvalid: false,
            sellerLicenceInvalid: false,
            buyerNameInvalid: false,
            buyerDOBInvalid: false,
            buyerAddressInvalid: false,
            buyerNumberInvalid: false,
            buyerEmployerNameInvalid: false,
            buyerIncomeInvalid: false,
            buyerPropertyAddressInvalid: false,
            buyerLoanAmountInvalid: false,
            blockchain: BC.Blockchain.initBlockChain(),
            permits: [],
            loans: [],
        };
        this.interval = null;
    }

    pad(num: number, len: number) {
        var str = "" + num;
        while (str.length < len) {
            str = "0" + str;
        }

        return str;
    }

    render() {
        /* 
        -- UI controls --
        */
        const showSeller = () => {
            this.setState({ sellerVisible: true });
            this.setState({ authorityVisible: false });
            this.setState({ buyerVisible: false });
            this.setState({ bankVisible: false });
            this.setState({ dealsVisible: false });
            this.setState({ blockChainVisible: false });
        };
        const showAuthority = () => {
            this.setState({ sellerVisible: false });
            this.setState({ authorityVisible: true });
            this.setState({ buyerVisible: false });
            this.setState({ bankVisible: false });
            this.setState({ dealsVisible: false });
            this.setState({ blockChainVisible: false });
        };
        const showBuyer = () => {
            this.setState({ sellerVisible: false });
            this.setState({ authorityVisible: false });
            this.setState({ buyerVisible: true });
            this.setState({ bankVisible: false });
            this.setState({ dealsVisible: false });
            this.setState({ blockChainVisible: false });
        };
        const showBank = () => {
            this.setState({ sellerVisible: false });
            this.setState({ authorityVisible: false });
            this.setState({ buyerVisible: false });
            this.setState({ bankVisible: true });
            this.setState({ dealsVisible: false });
            this.setState({ blockChainVisible: false });
        };
        const showDeals = () => {
            this.setState({ sellerVisible: false });
            this.setState({ authorityVisible: false });
            this.setState({ buyerVisible: false });
            this.setState({ bankVisible: false });
            this.setState({ dealsVisible: true });
            this.setState({ blockChainVisible: false });
        };
        const showBlockChain = () => {
            this.setState({ sellerVisible: false });
            this.setState({ authorityVisible: false });
            this.setState({ buyerVisible: false });
            this.setState({ bankVisible: false });
            this.setState({ dealsVisible: false });
            this.setState({ blockChainVisible: true });
        };

        /* 
        -- Seller logic --
        */
        const submitSeller = () => {
            var sellerAddressInvalid: boolean = this.state.sellerAddress?.length === 0 || this.state.sellerAddress === undefined;
            var sellerOwnerInvalid: boolean = this.state.sellerOwner?.length === 0 || this.state.sellerOwner === undefined;
            var sellerDesignInvalid: boolean = this.state.sellerDesign?.length === 0 || this.state.sellerDesign === undefined;
            var sellerLicenceInvalid: boolean = this.state.sellerLicence?.length === 0 || this.state.sellerLicence === undefined;

            this.setState({ sellerAddressInvalid: sellerAddressInvalid });
            this.setState({ sellerOwnerInvalid: sellerOwnerInvalid });
            this.setState({ sellerDesignInvalid: sellerDesignInvalid });
            this.setState({ sellerLicenceInvalid: sellerLicenceInvalid });

            if (!sellerAddressInvalid && !sellerOwnerInvalid && !sellerDesignInvalid && !sellerLicenceInvalid) {
                var id = "P" + this.pad(this.state.permits.length, 5);
                var permit: IPermit = {
                    id: id,
                    address: this.state.sellerAddress,
                    owner: this.state.sellerOwner,
                    design: this.state.sellerDesign,
                    licence: this.state.sellerLicence,
                    state: 0,
                };
                this.setState({ blockchain: BC.Blockchain.addToBlockchain(permit, this.state.blockchain) });

                var temp_permits = this.state.permits;
                this.state.permits.push(permit);
                this.setState({ permits: temp_permits });

                this.setState({ sellerMessage: "Permit added! The permit ID is: " + id });

                this.setState({ sellerAddress: "" });
                this.setState({ sellerOwner: "" });
                this.setState({ sellerDesign: "design.pdf" });
                this.setState({ sellerLicence: "" });

                this.setState({ sellerAddressInvalid: false });
                this.setState({ sellerOwnerInvalid: false });
                this.setState({ sellerDesignInvalid: false });
                this.setState({ sellerLicenceInvalid: false });
            }
        };

        /* 
        -- Permit logic --
        */
        const permitState = (id: string, state: number) => {
            for (var i = 0; i < this.state.permits.length; i++) {
                if (this.state.permits[i].id === id) {
                    this.state.permits[i].state = state;
                    this.setState({ blockchain: BC.Blockchain.addToBlockchain(this.state.permits[i], this.state.blockchain) });
                    break;
                }
            }
        };

        /*
        -- Buyer logic --
        */
        const submitBuyer = () => {
            var buyerNameInvalid: boolean = this.state.buyerName?.length === 0 || this.state.buyerName === undefined;
            var buyerDOBInvalid: boolean = this.state.buyerDOB?.length === 0 || this.state.buyerDOB === undefined;
            var buyerAddressInvalid: boolean = this.state.buyerAddress?.length === 0 || this.state.buyerAddress === undefined;
            var buyerNumberInvalid: boolean = this.state.buyerNumber?.length === 0 || this.state.buyerNumber === undefined;
            var buyerEmployerNameInvalid: boolean = this.state.buyerEmployerName?.length === 0 || this.state.buyerEmployerName === undefined;
            var buyerIncomeInvalid: boolean = this.state.buyerIncome === undefined;
            var buyerPropertyAddressInvalid: boolean = this.state.buyerPropertyAddress?.length === 0 || this.state.buyerPropertyAddress === undefined;
            var buyerLoanAmountInvalid: boolean = this.state.buyerLoanAmount === undefined;

            this.setState({ buyerNameInvalid: buyerNameInvalid });
            this.setState({ buyerDOBInvalid: buyerDOBInvalid });
            this.setState({ buyerAddressInvalid: buyerAddressInvalid });
            this.setState({ buyerNumberInvalid: buyerNumberInvalid });
            this.setState({ buyerEmployerNameInvalid: buyerEmployerNameInvalid });
            this.setState({ buyerIncomeInvalid: buyerIncomeInvalid });
            this.setState({ buyerPropertyAddressInvalid: buyerPropertyAddressInvalid });
            this.setState({ buyerLoanAmountInvalid: buyerLoanAmountInvalid });

            if (!buyerNameInvalid && !buyerDOBInvalid && !buyerAddressInvalid && !buyerNumberInvalid && !buyerEmployerNameInvalid && !buyerIncomeInvalid && !buyerPropertyAddressInvalid && !buyerLoanAmountInvalid) {
                var id = "L" + this.pad(this.state.loans.length, 5);
                var loan: ILoan = {
                    id: id,
                    name: this.state.buyerName,
                    dob: this.state.buyerDOB,
                    address: this.state.buyerAddress,
                    number: this.state.buyerNumber,
                    employerName: this.state.buyerEmployerName,
                    income: this.state.buyerIncome,
                    propertyAddress: this.state.buyerPropertyAddress,
                    loanAmount: this.state.buyerLoanAmount,
                    state: 0,
                };
                this.setState({ blockchain: BC.Blockchain.addToBlockchain(loan, this.state.blockchain) });

                var temp_loans = this.state.loans;
                this.state.loans.push(loan);
                this.setState({ loans: temp_loans });

                this.setState({ buyerMessage: "Loan added! The permit ID is: " + id });

                this.setState({ buyerName: "" });
                this.setState({ buyerDOB: "" });
                this.setState({ buyerAddress: "" });
                this.setState({ buyerNumber: "" });
                this.setState({ buyerEmployerName: "" });
                this.setState({ buyerIncome: 0 });
                this.setState({ buyerPropertyAddress: "" });
                this.setState({ buyerLoanAmount: 0 });

                this.setState({ buyerNameInvalid: false });
                this.setState({ buyerDOBInvalid: false });
                this.setState({ buyerAddressInvalid: false });
                this.setState({ buyerNumberInvalid: false });
                this.setState({ buyerEmployerNameInvalid: false });
                this.setState({ buyerIncomeInvalid: false });
                this.setState({ buyerPropertyAddressInvalid: false });
                this.setState({ buyerLoanAmountInvalid: false });
            }
        };

        /* 
        -- Loan logic --
        */
        const loanState = (id: string, state: number) => {
            for (var i = 0; i < this.state.loans.length; i++) {
                if (this.state.loans[i].id === id) {
                    this.state.loans[i].state = state;
                    this.setState({ blockchain: BC.Blockchain.addToBlockchain(this.state.loans[i], this.state.blockchain) });
                    break;
                }
            }
        };

        /*
        -- Deals logic --
        */
        const dealsPropertyAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            var result;
            var foundAddress = false;

            for (var i = 0; i < this.state.loans.length; i++) {
                console.log(this.state.loans[i].address);
                console.log(e.target.value);

                if (this.state.loans[i].propertyAddress === e.target.value && !foundAddress) {
                    foundAddress = true;

                    result =
                        this.state.loans[i].state === 0 ? (
                            <>
                                <Text weight="bold">
                                    <Icon as={FaQuestionCircle} marginRight={2} />
                                    Loan being assessed
                                </Text>
                            </>
                        ) : this.state.loans[i].state === 1 ? (
                            <>
                                <Text weight="bold">
                                    <Icon as={FaCheckCircle} color="Green" marginRight={2} />
                                    Loan approved
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text weight="bold">
                                    <Icon as={FaTimesCircle} color="Red" marginRight={2} />
                                    Loan denied
                                </Text>
                            </>
                        );

                    break;
                }
            }

            if (!foundAddress) {
                result = (
                    <>
                        <Text weight="bold">
                            <Icon as={FaClock} marginRight={2} />
                            Waiting on a buyer
                        </Text>
                    </>
                );
            }

            this.setState({ loanStatus: result });
        };

        return (
            <ChakraProvider theme={theme}>
                <HStack align="top" margin={5} spacing={5}>
                    <VStack spacing={2} width={150} align="left">
                        <Heading size="sm">User UI's</Heading>
                        <Button width="100%" variant={this.state.sellerVisible ? "solid" : "outline"} colorScheme="blue" leftIcon={<FaHome />} onClick={showSeller}>
                            Seller
                        </Button>
                        <Button width="100%" variant={this.state.authorityVisible ? "solid" : "outline"} colorScheme="blue" leftIcon={<FaExclamationCircle />} onClick={showAuthority}>
                            Authority
                        </Button>
                        <Button width="100%" variant={this.state.buyerVisible ? "solid" : "outline"} colorScheme="blue" leftIcon={<FaDollarSign />} onClick={showBuyer}>
                            Buyer
                        </Button>
                        <Button width="100%" variant={this.state.bankVisible ? "solid" : "outline"} colorScheme="blue" leftIcon={<FaBuilding />} onClick={showBank}>
                            Bank
                        </Button>
                        <Button width="100%" variant={this.state.dealsVisible ? "solid" : "outline"} colorScheme="blue" leftIcon={<FaHandshake />} onClick={showDeals}>
                            Deals
                        </Button>
                        <Button width="100%" variant={this.state.blockChainVisible ? "solid" : "outline"} colorScheme="blue" leftIcon={<FaLink />} onClick={showBlockChain}>
                            Blockchain
                        </Button>
                    </VStack>
                    <VStack flex="1" spacing={2} align="left" id="seller" hidden={!this.state.sellerVisible}>
                        <Heading as="h1">
                            <Icon as={FaHome} marginRight={2} />
                            Seller
                        </Heading>
                        <Alert status="success" hidden={this.state.sellerMessage === undefined}>
                            <AlertIcon />
                            {this.state.sellerMessage}
                        </Alert>
                        <FormControl id="fcsaddress" isRequired isInvalid={this.state.sellerAddressInvalid}>
                            <FormLabel htmlFor="saddress">Property Address</FormLabel>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ sellerAddress: e.target.value })} value={this.state.sellerAddress} id="saddress" width={450}></Input>
                        </FormControl>
                        <FormControl id="fcsowner" isRequired isInvalid={this.state.sellerOwnerInvalid}>
                            <FormLabel htmlFor="sowner">Owner/Vendor Details</FormLabel>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ sellerOwner: e.target.value })} value={this.state.sellerOwner} id="sowner" width={450}></Input>
                        </FormControl>
                        <FormControl id="fcsdesign" isRequired isInvalid={this.state.sellerDesignInvalid}>
                            <FormLabel htmlFor="sdesign">Building Design</FormLabel>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ sellerDesign: e.target.value })} value={this.state.sellerDesign} id="sdesign" width={450} defaultValue="design.pdf"></Input>
                        </FormControl>
                        <FormControl id="fcslicence" isRequired isInvalid={this.state.sellerLicenceInvalid}>
                            <FormLabel htmlFor="slicence">Seller Licence Number</FormLabel>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ sellerLicence: e.target.value })} value={this.state.sellerLicence} id="slicence" width={450}></Input>
                        </FormControl>
                        <Button onClick={submitSeller} leftIcon={<FaCheck />} width={450}>
                            Submit
                        </Button>
                    </VStack>
                    <VStack flex="1" spacing={2} align="left" id="authority" hidden={!this.state.authorityVisible}>
                        <Heading as="h1">
                            <Icon as={FaExclamationCircle} marginRight={2} />
                            Authority
                        </Heading>
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Permit Application ID</Th>
                                    <Th>Property Address</Th>
                                    <Th>Owner/Vendor Details</Th>
                                    <Th>Building Design</Th>
                                    <Th>Seller Licence Number</Th>
                                    <Th>Authority Result</Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.state.permits?.map((permit) => (
                                    <Tr key={"P" + permit.id}>
                                        <Td>{permit.id}</Td>
                                        <Td>{permit.address}</Td>
                                        <Td>{permit.owner}</Td>
                                        <Td>{permit.design}</Td>
                                        <Td>{permit.licence}</Td>
                                        <Td align="center">{permit.state === 0 ? <Icon as={FaQuestionCircle} /> : permit.state === 1 ? <Icon as={FaCheckCircle} color="Green" /> : <Icon as={FaTimesCircle} color="Red" />}</Td>
                                        <Td>
                                            <IconButton variant="outline" aria-label="Disapprove" icon={<Icon as={FaTimes} />} onClick={() => permitState(permit.id, 2)} />
                                        </Td>
                                        <Td>
                                            <IconButton variant="outline" aria-label="Approve" icon={<Icon as={FaCheck} onClick={() => permitState(permit.id, 1)} />} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </VStack>
                    <VStack flex="1" spacing={2} align="left" id="buyer" hidden={!this.state.buyerVisible}>
                        <Heading as="h1">
                            <Icon as={FaDollarSign} marginRight={2} />
                            Buyer
                        </Heading>
                        <Alert status="success" hidden={this.state.buyerMessage === undefined}>
                            <AlertIcon />
                            {this.state.buyerMessage}
                        </Alert>
                        <FormControl id="fcbname" isRequired isInvalid={this.state.buyerNameInvalid}>
                            <FormLabel htmlFor="bname">Full Name</FormLabel>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ buyerName: e.target.value })} value={this.state.buyerName} id="bname" width={450}></Input>
                        </FormControl>
                        <FormControl id="fcbDOB" isRequired isInvalid={this.state.buyerDOBInvalid}>
                            <FormLabel htmlFor="bDOB">Date of Birth</FormLabel>
                            <Input type="date" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ buyerDOB: e.target.value })} value={this.state.buyerDOB} id="bDOB" width={450}></Input>
                        </FormControl>
                        <FormControl id="fcbAddress" isRequired isInvalid={this.state.buyerAddressInvalid}>
                            <FormLabel htmlFor="bAddress">Current Address</FormLabel>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ buyerAddress: e.target.value })} value={this.state.buyerAddress} id="bAddress" width={450}></Input>
                        </FormControl>
                        <FormControl id="fcbNumber" isRequired isInvalid={this.state.buyerNumberInvalid}>
                            <FormLabel htmlFor="bNumber">Contact Number</FormLabel>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ buyerNumber: e.target.value })} value={this.state.buyerNumber} id="bNumber" width={450}></Input>
                        </FormControl>
                        <FormControl id="fcbEmployerName" isRequired isInvalid={this.state.buyerEmployerNameInvalid}>
                            <FormLabel htmlFor="bEmployerName">Employer Name</FormLabel>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ buyerEmployerName: e.target.value })} value={this.state.buyerEmployerName} id="bEmployerName" width={450}></Input>
                        </FormControl>
                        <FormControl id="fcbIncome" isRequired isInvalid={this.state.buyerIncomeInvalid}>
                            <FormLabel htmlFor="bIncome">Annual Income</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
                                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ buyerIncome: +e.target.value })} value={this.state.buyerIncome + ""} id="bIncome" width={450} type="number"></Input>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="fcbPropertyAddress" isRequired isInvalid={this.state.buyerPropertyAddressInvalid}>
                            <FormLabel htmlFor="bPropertyAddress">Address of the Property Intended to Purchase</FormLabel>
                            <Select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ buyerPropertyAddress: e.target.value })} value={this.state.buyerPropertyAddress} id="bPropertyAddress" width={450} placeholder="Select an address">
                                {this.state.permits?.map((permit) => {
                                    return permit.state === 1 ? <option>{permit.address}</option> : null;
                                })}
                            </Select>
                        </FormControl>
                        <FormControl id="fcbLoanAmount" isRequired isInvalid={this.state.buyerLoanAmountInvalid}>
                            <FormLabel htmlFor="bLoanAmount">Loan Amount</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em" children="$" />
                                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ buyerLoanAmount: +e.target.value })} value={this.state.buyerLoanAmount + ""} id="bLoanAmount" width={450} type="number"></Input>
                            </InputGroup>
                        </FormControl>
                        <Button onClick={submitBuyer} leftIcon={<FaCheck />} width={450}>
                            Submit
                        </Button>
                    </VStack>
                    <VStack flex="1" spacing={2} align="left" id="bank" hidden={!this.state.bankVisible}>
                        <Heading as="h1">
                            <Icon as={FaBuilding} marginRight={2} />
                            Bank
                        </Heading>
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>Loan Application ID</Th>
                                    <Th>Full Name</Th>
                                    <Th>Date of Birth</Th>
                                    <Th>Current Address</Th>
                                    <Th>Contact Number</Th>
                                    <Th>Employer Name</Th>
                                    <Th isNumeric={true}>Annual Income</Th>
                                    <Th>Address of the Property Intended to Purchase</Th>
                                    <Th isNumeric={true}>Loan Amount</Th>
                                    <Th>Loan Result</Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.state.loans?.map((loan) => (
                                    <Tr key={"L" + loan.id}>
                                        <Td>{loan.id}</Td>
                                        <Td>{loan.name}</Td>
                                        <Td>{loan.dob}</Td>
                                        <Td>{loan.address}</Td>
                                        <Td>{loan.number}</Td>
                                        <Td>{loan.employerName}</Td>
                                        <Td>{loan.income}</Td>
                                        <Td>{loan.propertyAddress}</Td>
                                        <Td>{loan.loanAmount}</Td>
                                        <Td align="center">{loan.state === 0 ? <Icon as={FaQuestionCircle} /> : loan.state === 1 ? <Icon as={FaCheckCircle} color="Green" /> : <Icon as={FaTimesCircle} color="Red" />}</Td>
                                        <Td>
                                            <IconButton variant="outline" aria-label="Disapprove" icon={<Icon as={FaTimes} />} onClick={() => loanState(loan.id, 2)} />
                                        </Td>
                                        <Td>
                                            <IconButton variant="outline" aria-label="Approve" icon={<Icon as={FaCheck} />} onClick={() => loanState(loan.id, 1)} />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </VStack>
                    <VStack flex="1" spacing={2} align="left" id="bank" hidden={!this.state.dealsVisible}>
                        <Heading as="h1">
                            <Icon as={FaHandshake} marginRight={2} />
                            Deals
                        </Heading>
                        <FormControl id="fcdPropertyAddress">
                            <FormLabel htmlFor="dPropertyAddress">Address of the Property Being Sold</FormLabel>
                            <Select onChange={dealsPropertyAddressChange} id="dPropertyAddress" width={450} placeholder="Select an address">
                                {this.state.permits?.map((permit) => {
                                    return permit.state === 1 ? <option>{permit.address}</option> : null;
                                })}
                            </Select>
                        </FormControl>
                        <Text>Loan status</Text>
                        {this.state.loanStatus}
                    </VStack>
                    <VStack flex="1" spacing={2} align="left" id="bank" hidden={!this.state.blockChainVisible}>
                        <Heading as="h1">
                            <Icon as={FaLink} marginRight={2} />
                            Blockchain
                        </Heading>
                        {this.state.blockchain !== undefined ? <CopyBlock text={JSON.stringify(this.state.blockchain, null, 1)} language="java" showLineNumbers={false} theme={nord} /> : null}
                    </VStack>
                </HStack>
            </ChakraProvider>
        );
    }
}

export default App;
