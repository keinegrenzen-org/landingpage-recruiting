<?php
/**
 * Created by PhpStorm.
 * User: Barthy
 * Date: 29.09.18
 * Time: 05:07
 */

namespace App\Service;


class NameParser
{

    /**
     * @var string
     */
    private $name;

    private function sanitize(): void
    {
        $this->name = filter_var($this->name, FILTER_SANITIZE_STRING);
    }

    private function decode(): void
    {
        $this->name = str_ireplace("-", " ", $this->name);
    }

    public function parseName()
    {
        $this->sanitize();
        $this->decode();
        $this->multiLine();
    }

    private function multiLine(): void
    {
        $nameArray = [];
        $space = strpos($this->name, " ");

        while ($space !== false) {
            if ($space >= 8) {
                $nameArray[] = substr($this->name, 0, $space);
                $this->name = substr($this->name, $space + 1);
                $space = strpos($this->name, " ");
            } else {
                $space = strpos($this->name, " ", $space + 1);
            }
        }

        $nameArray[] = $this->name;
        $this->name = implode("<br>", $nameArray);
    }

    /**
     * @return string
     */
    public function getNameForRendering(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }
}