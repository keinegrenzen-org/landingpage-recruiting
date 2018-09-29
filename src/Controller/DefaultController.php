<?php

namespace App\Controller;

use App\Service\NameParser;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{

    /**
     * @Route("/{name}", name="index", defaults={"name" = "Musik"})
     * @param string $name
     * @param NameParser $nameParser
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(string $name, NameParser $nameParser)
    {
        $nameParser->setName($name);
        $nameParser->parseName();

        return $this->render(
            'index.html.twig',
            [
                'name' => $nameParser->getNameForRendering(),
            ]
        );
    }
}
