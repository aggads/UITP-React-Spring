package com.uitp.service.controller;

import com.uitp.service.entities.*;
import com.uitp.service.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/uitp")
public class UitpController {

    @Autowired
    private FrequencyRepository frequencyRepository;
    @Autowired
    private IncidentRepository incidentRepository;
    @Autowired
    private MotivationsRepository motivationsRepository;
    @Autowired
    private QuestionsRepository questionsRepository;
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ModesRepository modesRepository;
    @Autowired
    RestTemplate restTemplate;


    @CrossOrigin
    @GetMapping("/getallquestions")
    public List<Questions> getAllQuestion() {
        return questionsRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/getallincident")
    public List<Incident> getAllIncident() {
        return incidentRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/getallmotivations")
    public List<Motivations> getAllMotivations() {
        return motivationsRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/getallfrequency")
    public List<Frequency> getAllFrequency() {
        return frequencyRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/getAllQuestions/{idIncident}")
    public List<Questions> getAllResult(@PathVariable("idIncident") int idIncident) {
        return questionsRepository.findByIdIncident(idIncident);
    }

    @CrossOrigin
    @GetMapping("/getallusers")
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

//    @CrossOrigin
//    @PostMapping("/result")
//    public ResponseEntity<?> addorUpdateResult(@RequestBody Result result) {
//        result.saveOrUpdateResult(result);
//        return new ResponseEntity("Result added successfully", HttpStatus.OK);
//    }

    @CrossOrigin
    @PostMapping("/result")
    Result newResult(@RequestBody Result newResult){
        return resultRepository.save(newResult);
    }


//    @RequestMapping(method = RequestMethod.POST, value = "/result",
//            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
//            produces = {MediaType.APPLICATION_ATOM_XML_VALUE, MediaType.APPLICATION_JSON_VALUE}
//    )
//    @ResponseStatus(value = HttpStatus.OK)
//    public Result result(@RequestBody Map<Integer, Integer> body) {
//        int idFrequency = body.get("idFrequency");
//        int idMotivation = body.get("idMotivation");
//        int idQuestion = body.get("idQuestion");
//
//        return idFrequency;
//    }
//    public void saveResult(@RequestParam int idFrequency, @RequestParam int idMotivation, @RequestParam int idQuestion) {
//
//    }


//    @GetMapping("/getallmodes")
//    public List<Modes> getAllModes() { return modesRepository.findAll();}
}
