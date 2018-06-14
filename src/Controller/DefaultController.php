<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{

    /**
     * @Route("/{name}", name="index", defaults={"name" = "Musik"})
     * @param string $name
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(string $name)
    {
        return $this->render('index.html.twig', [
            'name' => $name,
        ]);
    }
}
