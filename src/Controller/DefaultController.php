<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\VarDumper\VarDumper;

class DefaultController extends Controller
{

    /**
     * @Route("/{name}", name="index", defaults={"name" = "Musik"})
     * @param string $name
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(string $name)
    {
        $nameArray = [];
        $space = strpos($name, " ");

        while ($space !== false) {
            if ($space >= 8) {
                $nameArray[] = substr($name, 0, $space);
                $name = substr($name, $space + 1);
                $space = strpos($name, " ");
            } else {
                $space = strpos($name, " ", $space + 1);
            }
        }

        $nameArray[] = $name;

        $name = implode("<br>", $nameArray);

        return $this->render(
            'index.html.twig',
            [
                'name' => $name,
            ]
        );
    }
}
