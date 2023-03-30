import Head from "next/head";
import { characterList } from "../constants";
import { copyPassword } from "@/utils/copyToClipboardUtils";
import {
  generateEasyPassword,
  generateRandomPassword,
} from "@/utils/passwordUtils";
import {
  Heading,
  Box,
  Input,
  InputGroup,
  IconButton,
  InputRightElement,
  Button,
  Flex,
  Spacer,
  Center,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Divider,
  useToast,
  Tooltip,
  Radio,
  RadioGroup,
  ButtonGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CopyIcon, QusetionIcon, UpDownIcon } from "@chakra-ui/icons";
import ToggleDarkMode from "@/components/ToggleDarkMode";

export default function Home() {
  const [passwordType, setPasswordType] = useState("1");
  const [passwordLength, setPasswordLength] = useState(16);
  const [password, setPassword] = useState();
  const [sliderValue, setSliderValue] = useState(16);
  const [showTooltip, setShowTooltip] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleGeneratePass = (passLength = 16, passType) => {
    if (passType === "1") {
      const randomPass = generateRandomPassword(passLength);
      setPassword(randomPass);
      return randomPass;
    } else {
      const easyPass = generateEasyPassword();
      setPassword(easyPass);
      return easyPass;
    }
  };

  const handleCopy = (value) => {
    copyPassword(value);
    toast({
      title: "Password copied to clipboard.",
      description: `Copied a ${passwordLength} char long password to your clipboard`,
      status: "success",
      duration: 9000,
      isClosable: true,
      variant: "left-accent",
    });
  };

  const SelectPasswordType = () => {
    return (
      <RadioGroup
        onChange={setPasswordType}
        value={passwordType}
        colorScheme="teal"
      >
        <HStack>
          <Radio value="1">Random string</Radio>
          <Radio value="2">Easy to remember</Radio>
        </HStack>
      </RadioGroup>
    );
  };

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
    setPasswordLength(newValue);
  };

  const handleInputChange = (val) => {
    const newValue = parseInt(val);
    setSliderValue(newValue);
    setPasswordLength(newValue);
  };

  useEffect(() => {
    handleGeneratePass(passwordLength, passwordType);
  }, []);

  return (
    <>
      <Head>
        <title>Password Generator</title>
        <meta name="description" content="Generated a strong password" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/W3Journey_square.ico" />
      </Head>
      <ToggleDarkMode />
      <Center>
        <Box>
          <Center>
            <Heading size="xl" color="#81E6D9" mt="40px">
              Password Generator
            </Heading>
          </Center>
          <Center mt="30px">
            <SelectPasswordType />
          </Center>
          <Flex mt="15px">
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                placeholder={show ? password : "*********"}
                _placeholder={{ opacity: 1, color: "#81E6D9" }}
                type={show ? "Text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
              <Spacer />
            </InputGroup>
          </Flex>

          <Divider p={2} />
          <Flex justifyContent={"center"}>
            <Heading
              size="md"
              m="10px"
              align="center"
              textColor={passwordType === "2" ? "#252A36" : undefined}
            >
              Password Length
            </Heading>
            <Button
              size="xs"
              mt="2"
              onClick={() => setPasswordLength(16)}
              variant="outline"
              isDisabled={passwordType === "2" ? true : false}
            >
              reset
            </Button>
          </Flex>
          <HStack>
            <Flex borderWidth={1} w="350px" p="2" borderRadius={"md"}>
              <NumberInput
                defaultValue={passwordLength}
                min={1}
                max={32}
                value={passwordLength}
                size="md"
                maxW={"80px"}
                mr="1rem"
                onChange={(val) => handleInputChange(val)}
                isDisabled={passwordType === "2" ? true : false}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                size="lg"
                colorScheme="teal"
                min={1}
                max={32}
                mr="1rem"
                value={passwordLength}
                onChange={(val) => handleSliderChange(val)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                disabled={passwordType === "2" ? true : false}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="teal.500"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`${passwordLength}`}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </Flex>
          </HStack>
          <Divider p={2} />
          <Flex h="90px" mt="4" justifyContent={"center"}>
            <ButtonGroup spacing={"2"}>
              <Button
                onClick={() => handleGeneratePass(passwordLength, passwordType)}
                colorScheme="teal"
              >
                Generate New Password
              </Button>
              <Tooltip hasArrow label="Copy to clipboard" closeDelay={500}>
                <IconButton
                  aria-label="Copy to clipboard"
                  colorScheme="teal"
                  icon={<CopyIcon />}
                  ml="4px"
                  onClick={() => handleCopy(password)}
                />
              </Tooltip>
            </ButtonGroup>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
